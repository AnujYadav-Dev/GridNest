'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { Search, Sparkles } from 'lucide-react'
import { staggerContainer, fadeUp } from '@/lib/motion'
import { useForgeStore } from '@/store/useForgeStore'
import { ComponentCategory } from '@/types/component.types'
import { componentCategories, componentList } from '@/lib/componentCatalog'

export function ComponentGrid() {
  const [activeCategory, setActiveCategory] = useState<ComponentCategory | 'all'>('all')
  const [search, setSearch] = useState('')
  const { setSearchOpen } = useForgeStore()
  const shouldReduceMotion = useReducedMotion()

  const filtered = componentList.filter((c) => {
    const matchesCategory = activeCategory === 'all' || c.category === activeCategory
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div>
      {/* Header */}
      <motion.div
        variants={shouldReduceMotion ? undefined : staggerContainer}
        initial="hidden"
        animate="visible"
        className="mb-10"
      >
        <motion.p variants={shouldReduceMotion ? undefined : fadeUp} className="text-xs font-mono uppercase tracking-widest text-[var(--gridnest-text-muted)] mb-2">
          Component Library
        </motion.p>
        <motion.h1 variants={shouldReduceMotion ? undefined : fadeUp} className="font-sans text-3xl font-bold text-[var(--gridnest-text-primary)] tracking-tight mb-3">
          All Components
        </motion.h1>
        <motion.p variants={shouldReduceMotion ? undefined : fadeUp} className="text-[var(--gridnest-text-secondary)] max-w-lg">
          {componentList.length} production-grade, accessible, animated components. Copy the code, customize with tokens.
        </motion.p>
      </motion.div>

      {/* Filter + Search bar */}
      <div className="mb-8 flex min-w-0 flex-col gap-4 xl:flex-row xl:items-center">
        {/* Category filter */}
        <div className="no-scrollbar max-w-full overflow-x-auto rounded-[var(--gridnest-radius-md)] border border-[var(--gridnest-border)] bg-[var(--gridnest-surface)] p-1">
          <div className="flex w-max min-w-full items-center gap-1">
          {componentCategories.map((cat) => (
            <button
              key={cat.value}
              id={`filter-${cat.value}`}
              onClick={() => setActiveCategory(cat.value)}
              className={`relative shrink-0 px-3 py-1.5 text-xs rounded-[var(--gridnest-radius-sm)] transition-colors ${
                activeCategory === cat.value
                  ? 'bg-[var(--gridnest-accent)] text-white'
                  : 'text-[var(--gridnest-text-secondary)] hover:text-[var(--gridnest-text-primary)] hover:bg-[var(--gridnest-surface-2)]'
              }`}
            >
              {cat.label}
            </button>
          ))}
          </div>
        </div>

        {/* Search */}
        <button
          id="open-search-palette"
          onClick={() => setSearchOpen(true)}
          className="flex w-full items-center gap-2 rounded-[var(--gridnest-radius-md)] border border-[var(--gridnest-border)] bg-[var(--gridnest-surface)] px-3 py-2 text-xs text-[var(--gridnest-text-muted)] transition-colors hover:border-[var(--gridnest-border-hover)] xl:ml-auto xl:w-64"
        >
          <Search size={12} />
          Search components...
          <kbd className="ml-auto rounded border border-[var(--gridnest-border)] px-1 py-0.5 font-mono text-[10px]">⌘K</kbd>
        </button>
      </div>

      {/* Component Grid */}
      <motion.div
        variants={shouldReduceMotion ? undefined : staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4"
      >
        {filtered.map((component) => (
          <motion.div
            key={component.slug}
            variants={shouldReduceMotion ? undefined : fadeUp}
          >
            <Link
              href={`/components/${component.slug}`}
              id={`component-card-${component.slug}`}
              className="group flex flex-col h-full rounded-[var(--gridnest-radius-lg)] border border-[var(--gridnest-border)] bg-[var(--gridnest-surface)] p-5 hover:border-[var(--gridnest-accent)] hover:shadow-[var(--gridnest-shadow-glow)] transition-all duration-200 hover:-translate-y-0.5"
            >
              {/* Card header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-[var(--gridnest-radius-md)] bg-[var(--gridnest-surface-2)] text-[var(--gridnest-accent)] border border-[var(--gridnest-border)] group-hover:bg-[var(--gridnest-accent-subtle)] transition-colors">
                  <span className="font-mono text-xs font-bold">
                    {component.name.substring(0, 2).toUpperCase()}
                  </span>
                </div>
                {component.isNew && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-[var(--gridnest-accent)] px-2 py-0.5 text-[9px] font-bold text-white uppercase tracking-wider">
                    <Sparkles size={8} /> New
                  </span>
                )}
              </div>

              <h2 className="font-sans font-semibold text-sm text-[var(--gridnest-text-primary)] mb-1.5">
                {component.name}
              </h2>
              <p className="text-xs text-[var(--gridnest-text-secondary)] leading-relaxed flex-1">
                {component.description}
              </p>

              <div className="mt-4 flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--gridnest-text-muted)]">
                  {component.category}
                </span>
                <span className="text-[10px] text-[var(--gridnest-accent)] opacity-0 group-hover:opacity-100 transition-opacity">
                  View docs →
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {filtered.length === 0 && (
        <div className="py-16 text-center text-sm text-[var(--gridnest-text-muted)]">
          No components match &quot;{search}&quot;.
        </div>
      )}
    </div>
  )
}
