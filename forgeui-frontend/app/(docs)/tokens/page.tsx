'use client'

import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Check, Copy } from 'lucide-react'
import { allTokenGroups, Token } from '@/lib/tokens'
import { staggerContainer, fadeUp } from '@/lib/motion'
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard'

function ColorSwatch({ token }: { token: Token }) {
  const { copied, copy } = useCopyToClipboard()

  return (
    <button
      id={`token-swatch-${token.cssVar.replace('--', '')}`}
      onClick={() => void copy(token.cssVar)}
      className="group flex items-center gap-3 rounded-[var(--forge-radius-md)] border border-[var(--forge-border)] bg-[var(--forge-surface)] p-3 text-left hover:border-[var(--forge-border-hover)] transition-colors"
    >
      <div
        className="h-8 w-8 shrink-0 rounded-[var(--forge-radius-sm)] border border-[var(--forge-border)]"
        style={{ backgroundColor: token.value }}
      />
      <div className="min-w-0">
        <p className="truncate text-xs font-medium text-[var(--forge-text-primary)]">{token.name}</p>
        <p className="truncate text-[10px] font-mono text-[var(--forge-text-muted)]">{token.cssVar}</p>
      </div>
      <div className="ml-auto shrink-0 text-[var(--forge-text-muted)] group-hover:text-[var(--forge-text-secondary)] transition-colors">
        {copied ? <Check size={12} className="text-[var(--forge-success)]" /> : <Copy size={12} />}
      </div>
    </button>
  )
}

function SpacingRuler({ token }: { token: Token }) {
  const { copied, copy } = useCopyToClipboard()
  const px = parseInt(token.value)

  return (
    <button
      onClick={() => void copy(token.cssVar)}
      className="flex items-center gap-4 w-full rounded-[var(--forge-radius-md)] border border-[var(--forge-border)] bg-[var(--forge-surface)] p-3 hover:border-[var(--forge-border-hover)] transition-colors text-left"
    >
      <span className="w-20 shrink-0 text-xs font-mono text-[var(--forge-text-muted)]">{token.value}</span>
      <div
        className="h-2 rounded-full bg-[var(--forge-accent)] opacity-60"
        style={{ width: `${Math.min(px * 3, 240)}px` }}
      />
      <span className="ml-auto text-[10px] font-mono text-[var(--forge-text-muted)]">{token.name}</span>
    </button>
  )
}

function RadiusPreview({ token }: { token: Token }) {
  const { copied, copy } = useCopyToClipboard()

  return (
    <button
      onClick={() => void copy(token.cssVar)}
      className="group flex flex-col items-center gap-3 rounded-[var(--forge-radius-md)] border border-[var(--forge-border)] bg-[var(--forge-surface)] p-4 hover:border-[var(--forge-border-hover)] transition-colors"
    >
      <div
        className="h-12 w-16 border-2 border-[var(--forge-accent)] bg-[var(--forge-accent-subtle)]"
        style={{ borderRadius: token.value }}
      />
      <div className="text-center">
        <p className="text-xs font-medium text-[var(--forge-text-primary)]">{token.name}</p>
        <p className="text-[10px] font-mono text-[var(--forge-text-muted)]">{token.value}</p>
      </div>
    </button>
  )
}

function ShadowCard({ token }: { token: Token }) {
  const { copied, copy } = useCopyToClipboard()

  return (
    <button
      onClick={() => void copy(token.cssVar)}
      className="flex flex-col items-center gap-3 rounded-[var(--forge-radius-md)] border border-[var(--forge-border)] bg-[var(--forge-surface)] p-6 hover:border-[var(--forge-border-hover)] transition-colors"
      style={{ boxShadow: token.value }}
    >
      <p className="text-xs font-medium text-[var(--forge-text-primary)]">{token.name}</p>
      <p className="text-[10px] font-mono text-[var(--forge-text-muted)]">{token.cssVar}</p>
    </button>
  )
}

const SECTIONS = ['Colors', 'Typography', 'Spacing', 'Radius', 'Shadows', 'Motion']

export default function TokensPage() {
  const [activeSection, setActiveSection] = useState('Colors')
  const shouldReduceMotion = useReducedMotion()

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
          Design System
        </motion.p>
        <motion.h1 variants={shouldReduceMotion ? undefined : fadeUp} className="font-sans text-3xl font-bold text-[var(--forge-text-primary)] tracking-tight mb-3">
          Token Explorer
        </motion.h1>
        <motion.p variants={shouldReduceMotion ? undefined : fadeUp} className="text-[var(--forge-text-secondary)] max-w-md">
          All CSS custom properties that power the ForgeUI design system. Click any token to copy its variable name.
        </motion.p>
      </motion.div>

      {/* Section tabs */}
      <div className="flex flex-wrap gap-1 mb-8 p-1 rounded-[var(--forge-radius-md)] bg-[var(--forge-surface)] border border-[var(--forge-border)] w-fit">
        {SECTIONS.map((s) => (
          <button
            key={s}
            id={`token-section-${s.toLowerCase()}`}
            onClick={() => setActiveSection(s)}
            className={`px-3 py-1.5 text-xs rounded-[var(--forge-radius-sm)] transition-colors ${
              activeSection === s
                ? 'bg-[var(--forge-accent)] text-white'
                : 'text-[var(--forge-text-secondary)] hover:text-[var(--forge-text-primary)] hover:bg-[var(--forge-surface-2)]'
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Token groups */}
      {allTokenGroups
        .filter((g) => g.label === activeSection)
        .map((group) => (
          <div key={group.label}>
            <p className="mb-6 text-sm text-[var(--forge-text-secondary)]">{group.description}</p>

            {group.label === 'Colors' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {group.tokens.map((t) => <ColorSwatch key={t.cssVar} token={t} />)}
              </div>
            )}

            {group.label === 'Typography' && (
              <div className="space-y-4">
                {group.tokens.map((t) => (
                  <div key={t.cssVar} className="rounded-[var(--forge-radius-md)] border border-[var(--forge-border)] bg-[var(--forge-surface)] p-5">
                    <p className="text-xs font-mono text-[var(--forge-text-muted)] mb-2">{t.cssVar}</p>
                    <p className="text-2xl text-[var(--forge-text-primary)]" style={{ fontFamily: t.value }}>
                      {t.name} — The quick brown fox
                    </p>
                  </div>
                ))}
              </div>
            )}

            {group.label === 'Spacing' && (
              <div className="space-y-2">
                {group.tokens.map((t) => <SpacingRuler key={t.cssVar} token={t} />)}
              </div>
            )}

            {group.label === 'Radius' && (
              <div className="flex flex-wrap gap-4">
                {group.tokens.map((t) => <RadiusPreview key={t.cssVar} token={t} />)}
              </div>
            )}

            {group.label === 'Shadows' && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {group.tokens.map((t) => <ShadowCard key={t.cssVar} token={t} />)}
              </div>
            )}

            {group.label === 'Motion' && (
              <div className="space-y-3">
                {group.tokens.map((t) => (
                  <div key={t.cssVar} className="flex items-center gap-4 rounded-[var(--forge-radius-md)] border border-[var(--forge-border)] bg-[var(--forge-surface)] p-4">
                    <div className="w-24 shrink-0">
                      <p className="text-xs font-medium text-[var(--forge-text-primary)]">{t.name}</p>
                      <p className="text-[10px] font-mono text-[var(--forge-text-muted)]">{t.cssVar}</p>
                    </div>
                    <code className="flex-1 text-xs font-mono text-[var(--forge-text-secondary)] truncate">{t.value}</code>
                    {t.type === 'duration' && (
                      <div
                        className="h-2 w-2 rounded-full bg-[var(--forge-accent)]"
                        style={{
                          animation: `ping ${t.value} cubic-bezier(0.16, 1, 0.3, 1) infinite`,
                        }}
                      />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
    </div>
  )
}
