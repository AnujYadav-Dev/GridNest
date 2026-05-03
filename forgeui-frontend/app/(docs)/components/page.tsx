'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { Search, Sparkles } from 'lucide-react'
import { staggerContainer, fadeUp } from '@/lib/motion'
import { useForgeStore } from '@/store/useForgeStore'
import { ComponentCategory } from '@/types/component.types'

const components = [
  { slug: 'button', name: 'Button', category: 'form' as ComponentCategory, description: 'Variants, sizes, loading state, icon support.' },
  { slug: 'badge', name: 'Badge', category: 'display' as ComponentCategory, description: 'Color variants, dot indicator, animated live badge.' },
  { slug: 'avatar', name: 'Avatar', category: 'display' as ComponentCategory, description: 'Image with fallback initials, status indicator dot.' },
  { slug: 'skeleton', name: 'Skeleton', category: 'display' as ComponentCategory, description: 'Shimmer animation, text, circle, and rect variants.' },
  { slug: 'progress', name: 'Progress', category: 'display' as ComponentCategory, description: 'Determinate + indeterminate animated progress bar.' },
  { slug: 'toggle', name: 'Toggle', category: 'form' as ComponentCategory, description: 'Spring-physics animated switch with accessible label.' },
  { slug: 'input', name: 'Input', category: 'form' as ComponentCategory, description: 'Label, helper text, error state, icon adornment.' },
  { slug: 'tooltip', name: 'Tooltip', category: 'feedback' as ComponentCategory, description: 'Radix primitive, custom styled, smooth animation.' },
  { slug: 'dropdown', name: 'Dropdown', category: 'navigation' as ComponentCategory, description: 'Radix primitive, animated open/close.' },
  { slug: 'tabs', name: 'Tabs', category: 'navigation' as ComponentCategory, description: 'Animated underline, keyboard navigation, vertical option.' },
  { slug: 'accordion', name: 'Accordion', category: 'navigation' as ComponentCategory, description: 'Spring-based expand/collapse, multiple or single mode.' },
  { slug: 'card', name: 'Card', category: 'display' as ComponentCategory, description: 'Default, elevated, bordered, and interactive variants.' },
  { slug: 'toast', name: 'Toast', category: 'feedback' as ComponentCategory, description: 'Slide-in, auto-dismiss with progress bar. New!', isNew: true },
  { slug: 'modal', name: 'Modal', category: 'feedback' as ComponentCategory, description: 'Backdrop blur, scale + fade, focus trap via Radix.' },
]

const CATEGORIES: { value: ComponentCategory | 'all'; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'form', label: 'Form' },
  { value: 'display', label: 'Display' },
  { value: 'feedback', label: 'Feedback' },
  { value: 'navigation', label: 'Navigation' },
]

export default function ComponentsPage() {
  const [activeCategory, setActiveCategory] = useState<ComponentCategory | 'all'>('all')
  const [search, setSearch] = useState('')
  const { setSearchOpen } = useForgeStore()
  const shouldReduceMotion = useReducedMotion()

  const filtered = components.filter((c) => {
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
        <motion.p variants={shouldReduceMotion ? undefined : fadeUp} className="text-xs font-mono uppercase tracking-widest text-[var(--forge-text-muted)] mb-2">
          Component Library
        </motion.p>
        <motion.h1 variants={shouldReduceMotion ? undefined : fadeUp} className="font-sans text-3xl font-bold text-[var(--forge-text-primary)] tracking-tight mb-3">
          All Components
        </motion.h1>
        <motion.p variants={shouldReduceMotion ? undefined : fadeUp} className="text-[var(--forge-text-secondary)] max-w-lg">
          14 production-grade, accessible, animated components. Copy the code, customize with tokens.
        </motion.p>
      </motion.div>

      {/* Filter + Search bar */}
      <div className="mb-8 flex flex-col sm:flex-row gap-4">
        {/* Category filter */}
        <div className="flex items-center gap-1 p-1 rounded-[var(--forge-radius-md)] bg-[var(--forge-surface)] border border-[var(--forge-border)]">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              id={`filter-${cat.value}`}
              onClick={() => setActiveCategory(cat.value)}
              className={`relative px-3 py-1.5 text-xs rounded-[var(--forge-radius-sm)] transition-colors ${
                activeCategory === cat.value
                  ? 'bg-[var(--forge-accent)] text-white'
                  : 'text-[var(--forge-text-secondary)] hover:text-[var(--forge-text-primary)] hover:bg-[var(--forge-surface-2)]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <button
          id="open-search-palette"
          onClick={() => setSearchOpen(true)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-[var(--forge-radius-md)] border border-[var(--forge-border)] bg-[var(--forge-surface)] text-xs text-[var(--forge-text-muted)] hover:border-[var(--forge-border-hover)] transition-colors sm:ml-auto"
        >
          <Search size={12} />
          Search components...
          <kbd className="ml-auto rounded border border-[var(--forge-border)] px-1 py-0.5 font-mono text-[10px]">⌘K</kbd>
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
              className="group flex flex-col h-full rounded-[var(--forge-radius-lg)] border border-[var(--forge-border)] bg-[var(--forge-surface)] p-5 hover:border-[var(--forge-accent)] hover:shadow-[var(--forge-shadow-glow)] transition-all duration-200 hover:-translate-y-0.5"
            >
              {/* Card header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-[var(--forge-radius-md)] bg-[var(--forge-surface-2)] text-[var(--forge-accent)] border border-[var(--forge-border)] group-hover:bg-[var(--forge-accent-subtle)] transition-colors">
                  <span className="font-mono text-xs font-bold">
                    {component.name.substring(0, 2).toUpperCase()}
                  </span>
                </div>
                {component.isNew && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-[var(--forge-accent)] px-2 py-0.5 text-[9px] font-bold text-white uppercase tracking-wider">
                    <Sparkles size={8} /> New
                  </span>
                )}
              </div>

              <h2 className="font-sans font-semibold text-sm text-[var(--forge-text-primary)] mb-1.5">
                {component.name}
              </h2>
              <p className="text-xs text-[var(--forge-text-secondary)] leading-relaxed flex-1">
                {component.description}
              </p>

              <div className="mt-4 flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--forge-text-muted)]">
                  {component.category}
                </span>
                <span className="text-[10px] text-[var(--forge-accent)] opacity-0 group-hover:opacity-100 transition-opacity">
                  View docs →
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {filtered.length === 0 && (
        <div className="py-16 text-center text-sm text-[var(--forge-text-muted)]">
          No components match &quot;{search}&quot;.
        </div>
      )}
    </div>
  )
}
