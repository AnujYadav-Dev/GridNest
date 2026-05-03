'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { Bookmark, X, Plus } from 'lucide-react'
import { staggerContainer, fadeUp } from '@/lib/motion'
import { useForgeStore } from '@/store/useForgeStore'
import { componentRegistry } from '@/lib/componentRegistry'

export default function SavedPage() {
  const { savedSlugs, unsaveComponent } = useForgeStore()
  const shouldReduceMotion = useReducedMotion()

  const savedDocs = savedSlugs
    .map((slug) => componentRegistry[slug])
    .filter(Boolean)

  return (
    <motion.div
      variants={shouldReduceMotion ? undefined : staggerContainer}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={shouldReduceMotion ? undefined : fadeUp} className="mb-8">
        <p className="text-xs font-mono uppercase tracking-widest text-[var(--gridnest-text-muted)] mb-1">Dashboard</p>
        <h1 className="font-sans text-2xl font-bold text-[var(--gridnest-text-primary)] tracking-tight mb-1">
          Saved Components
        </h1>
        <p className="text-sm text-[var(--gridnest-text-secondary)]">
          {savedDocs.length} component{savedDocs.length !== 1 ? 's' : ''} saved
        </p>
      </motion.div>

      {savedDocs.length === 0 ? (
        <motion.div
          variants={shouldReduceMotion ? undefined : fadeUp}
          className="flex flex-col items-center justify-center py-20 text-center"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-[var(--gridnest-radius-lg)] bg-[var(--gridnest-surface-2)] text-[var(--gridnest-text-muted)] mb-4">
            <Bookmark size={20} />
          </div>
          <p className="text-sm font-medium text-[var(--gridnest-text-primary)] mb-1">No saved components yet</p>
          <p className="text-xs text-[var(--gridnest-text-muted)] mb-6">
            Browse the component library and save your favorites.
          </p>
          <Link
            href="/components"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-[var(--gridnest-radius-md)] bg-[var(--gridnest-accent)] text-white text-sm hover:bg-[var(--gridnest-accent-hover)] transition-colors"
          >
            <Plus size={14} />
            Browse Components
          </Link>
        </motion.div>
      ) : (
        <motion.div
          variants={shouldReduceMotion ? undefined : staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {savedDocs.map((doc) => (
            <motion.div
              key={doc.slug}
              variants={shouldReduceMotion ? undefined : fadeUp}
              className="group relative rounded-[var(--gridnest-radius-lg)] border border-[var(--gridnest-border)] bg-[var(--gridnest-surface)] p-5 hover:border-[var(--gridnest-border-hover)] transition-colors"
            >
              {/* Unsave button */}
              <button
                id={`unsave-${doc.slug}`}
                onClick={() => unsaveComponent(doc.slug)}
                aria-label={`Unsave ${doc.name}`}
                className="absolute top-3 right-3 flex h-7 w-7 items-center justify-center rounded-full bg-[var(--gridnest-surface-2)] text-[var(--gridnest-text-muted)] opacity-0 group-hover:opacity-100 hover:bg-[var(--gridnest-danger)]/10 hover:text-[var(--gridnest-danger)] transition-all"
              >
                <X size={12} />
              </button>

              <div className="flex h-9 w-9 items-center justify-center rounded-[var(--gridnest-radius-md)] bg-[var(--gridnest-surface-2)] text-[var(--gridnest-accent)] border border-[var(--gridnest-border)] mb-3">
                <span className="font-mono text-xs font-bold">
                  {doc.name.substring(0, 2).toUpperCase()}
                </span>
              </div>

              <h2 className="font-sans font-semibold text-sm text-[var(--gridnest-text-primary)] mb-1">
                {doc.name}
              </h2>
              <p className="text-xs text-[var(--gridnest-text-secondary)] leading-relaxed mb-4">
                {doc.description.split('.')[0]}.
              </p>

              <Link
                href={`/components/${doc.slug}`}
                className="text-xs text-[var(--gridnest-accent)] hover:text-[var(--gridnest-accent-hover)] transition-colors"
              >
                View docs →
              </Link>
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  )
}
