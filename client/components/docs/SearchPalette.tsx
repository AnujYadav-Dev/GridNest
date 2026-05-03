'use client'

import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X } from 'lucide-react'
import Link from 'next/link'
import { useForgeStore } from '@/store/useForgeStore'
import { scaleIn } from '@/lib/motion'
import { CATEGORY_LABELS, componentList } from '@/lib/componentCatalog'

interface SearchPaletteProps {
  query: string
  setQuery: (q: string) => void
}

export function SearchPalette({ query, setQuery }: SearchPaletteProps) {
  const { searchOpen, setSearchOpen } = useForgeStore()
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setSearchOpen(true)
      }
      if (e.key === 'Escape') {
        setSearchOpen(false)
        setQuery('')
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [setSearchOpen, setQuery])

  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [searchOpen])

  const filtered = componentList.filter(
    (c) =>
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      CATEGORY_LABELS[c.category].toLowerCase().includes(query.toLowerCase())
  )

  return (
    <AnimatePresence>
      {searchOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={() => { setSearchOpen(false); setQuery('') }}
          />

          {/* Palette */}
          <motion.div
            variants={scaleIn}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="fixed left-1/2 top-[20%] z-50 w-full max-w-lg -translate-x-1/2 rounded-[var(--gridnest-radius-lg)] border border-[var(--gridnest-border)] bg-[var(--gridnest-surface)] shadow-[var(--gridnest-shadow-md)] overflow-hidden"
          >
            {/* Search input */}
            <div className="flex items-center gap-3 border-b border-[var(--gridnest-border)] px-4 py-3">
              <Search size={16} className="shrink-0 text-[var(--gridnest-text-muted)]" />
              <input
                ref={inputRef}
                id="search-palette-input"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search components..."
                className="flex-1 bg-transparent text-sm text-[var(--gridnest-text-primary)] placeholder:text-[var(--gridnest-text-muted)] outline-none"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="text-[var(--gridnest-text-muted)] hover:text-[var(--gridnest-text-secondary)]"
                >
                  <X size={14} />
                </button>
              )}
              <kbd className="hidden sm:flex items-center gap-0.5 rounded border border-[var(--gridnest-border)] px-1.5 py-0.5 text-[10px] text-[var(--gridnest-text-muted)] font-mono">
                Esc
              </kbd>
            </div>

            {/* Results */}
            <ul className="max-h-72 overflow-y-auto py-2">
              {filtered.length === 0 ? (
                <li className="px-4 py-8 text-center text-sm text-[var(--gridnest-text-muted)]">
                  No components found.
                </li>
              ) : (
                filtered.map((c) => (
                  <li key={c.slug}>
                    <Link
                      href={`/components/${c.slug}`}
                      onClick={() => { setSearchOpen(false); setQuery('') }}
                      className="flex items-center justify-between px-4 py-2.5 text-sm text-[var(--gridnest-text-primary)] hover:bg-[var(--gridnest-surface-2)] transition-colors"
                    >
                      <span>{c.name}</span>
                      <span className="text-[10px] text-[var(--gridnest-text-muted)] font-mono uppercase tracking-wider">
                        {CATEGORY_LABELS[c.category]}
                      </span>
                    </Link>
                  </li>
                ))
              )}
            </ul>

            <div className="border-t border-[var(--gridnest-border)] px-4 py-2 flex gap-3">
              <span className="text-[10px] text-[var(--gridnest-text-muted)] flex items-center gap-1">
                <kbd className="rounded border border-[var(--gridnest-border)] px-1 py-0.5 font-mono">↑↓</kbd> navigate
              </span>
              <span className="text-[10px] text-[var(--gridnest-text-muted)] flex items-center gap-1">
                <kbd className="rounded border border-[var(--gridnest-border)] px-1 py-0.5 font-mono">⏎</kbd> open
              </span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
