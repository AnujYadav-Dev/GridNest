'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { Bookmark, Palette, ArrowRight, Layers } from 'lucide-react'
import { staggerContainer, fadeUp } from '@/lib/motion'
import { useForgeStore } from '@/store/useForgeStore'
import api from '@/lib/api'
import { User } from '@/types/auth.types'

export default function DashboardPage() {
  const { savedSlugs } = useForgeStore()
  const [user, setUser] = useState<User | null>(null)
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    api.get<User>('/api/auth/me/').then((r) => setUser(r.data)).catch(() => null)
  }, [])

  const stats = [
    { label: 'Saved Components', value: savedSlugs.length, icon: Bookmark, href: '/dashboard/saved' },
    { label: 'Saved Themes', value: 0, icon: Palette, href: '/dashboard/themes' },
    { label: 'Total Components', value: 14, icon: Layers, href: '/components' },
  ]

  return (
    <motion.div
      variants={shouldReduceMotion ? undefined : staggerContainer}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div variants={shouldReduceMotion ? undefined : fadeUp} className="mb-10">
        <p className="text-xs font-mono uppercase tracking-widest text-[var(--forge-text-muted)] mb-1">Dashboard</p>
        <h1 className="font-sans text-2xl font-bold text-[var(--forge-text-primary)] tracking-tight">
          {user ? `Welcome back, ${user.username}` : 'Your Dashboard'}
        </h1>
        <p className="text-sm text-[var(--forge-text-secondary)] mt-1">
          Track your saved components and custom themes.
        </p>
      </motion.div>

      {/* Stats */}
      <motion.div variants={shouldReduceMotion ? undefined : fadeUp} className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Link
              key={stat.label}
              href={stat.href}
              className="group flex items-center gap-4 rounded-[var(--forge-radius-lg)] border border-[var(--forge-border)] bg-[var(--forge-surface)] p-5 hover:border-[var(--forge-accent)] hover:shadow-[var(--forge-shadow-glow)] transition-all"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-[var(--forge-radius-md)] bg-[var(--forge-accent-subtle)] text-[var(--forge-accent)]">
                <Icon size={18} />
              </div>
              <div>
                <p className="font-sans text-2xl font-bold text-[var(--forge-text-primary)]">{stat.value}</p>
                <p className="text-xs text-[var(--forge-text-secondary)]">{stat.label}</p>
              </div>
              <ArrowRight size={14} className="ml-auto text-[var(--forge-text-muted)] group-hover:text-[var(--forge-accent)] transition-colors" />
            </Link>
          )
        })}
      </motion.div>

      {/* Quick links */}
      <motion.div variants={shouldReduceMotion ? undefined : fadeUp}>
        <h2 className="font-sans text-sm font-semibold text-[var(--forge-text-primary)] mb-4">Quick Links</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { href: '/components', label: 'Browse all 14 components', sub: 'Explore the full component library' },
            { href: '/tokens', label: 'Design Token Explorer', sub: 'View and copy all CSS custom properties' },
            { href: '/motion', label: 'Motion Guide', sub: 'Easing curves, variants, and animation rules' },
            { href: '/dashboard/themes', label: 'Theme Builder', sub: 'Create and export custom token themes' },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center justify-between rounded-[var(--forge-radius-md)] border border-[var(--forge-border)] bg-[var(--forge-surface)] px-4 py-3 hover:border-[var(--forge-border-hover)] transition-colors group"
            >
              <div>
                <p className="text-sm font-medium text-[var(--forge-text-primary)]">{link.label}</p>
                <p className="text-xs text-[var(--forge-text-muted)]">{link.sub}</p>
              </div>
              <ArrowRight size={14} className="shrink-0 text-[var(--forge-text-muted)] group-hover:text-[var(--forge-accent)] transition-colors" />
            </Link>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}
