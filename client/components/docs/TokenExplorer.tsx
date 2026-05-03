'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Check, Copy } from 'lucide-react'
import { useState } from 'react'
import { staggerContainer, fadeUp } from '@/lib/motion'
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard'
import { allTokenGroups, Token } from '@/lib/tokens'

const USAGE_RECIPES = [
  {
    title: 'Surface Panel',
    code: 'background: var(--gridnest-surface); border: 1px solid var(--gridnest-border);',
  },
  {
    title: 'Primary Action',
    code: 'background: var(--gridnest-accent); box-shadow: var(--gridnest-shadow-glow);',
  },
  {
    title: 'Quiet Text',
    code: 'color: var(--gridnest-text-secondary); font-family: var(--gridnest-font-body);',
  },
]

function TokenPreview({ token }: { token: Token }) {
  if (token.type === 'color') {
    return <div className="h-10 w-10 rounded-[var(--gridnest-radius-md)] border border-[var(--gridnest-border)]" style={{ backgroundColor: `var(${token.cssVar})` }} />
  }

  if (token.type === 'radius') {
    return <div className="h-10 w-10 border border-[var(--gridnest-accent)] bg-[var(--gridnest-accent-subtle)]" style={{ borderRadius: `var(${token.cssVar})` }} />
  }

  if (token.type === 'shadow') {
    return <div className="h-10 w-10 rounded-[var(--gridnest-radius-md)] bg-[var(--gridnest-surface-2)]" style={{ boxShadow: `var(${token.cssVar})` }} />
  }

  if (token.type === 'spacing') {
    return <div className="flex h-10 w-16 items-center"><span className="block h-3 rounded-full bg-[var(--gridnest-accent)]" style={{ width: `var(${token.cssVar})` }} /></div>
  }

  if (token.type === 'duration' || token.type === 'easing') {
    return <div className="h-10 w-16 overflow-hidden rounded-full bg-[var(--gridnest-surface-2)]"><span className="block h-full w-6 rounded-full bg-[var(--gridnest-accent)]" /></div>
  }

  return <div className="flex h-10 w-16 items-center font-mono text-xs text-[var(--gridnest-accent)]">Aa</div>
}

export default function TokenExplorer() {
  const { copy } = useCopyToClipboard()
  const [copiedToken, setCopiedToken] = useState<string | null>(null)
  const shouldReduceMotion = useReducedMotion()

  const handleCopy = (val: string) => {
    void copy(val)
    setCopiedToken(val)
    setTimeout(() => setCopiedToken(null), 1600)
  }

  return (
    <div>
      <motion.div
        variants={shouldReduceMotion ? undefined : staggerContainer}
        initial="hidden"
        animate="visible"
        className="mb-12"
      >
        <motion.p variants={shouldReduceMotion ? undefined : fadeUp} className="mb-2 text-xs font-mono uppercase tracking-widest text-[var(--gridnest-text-muted)]">
          Design Tokens
        </motion.p>
        <motion.h1 variants={shouldReduceMotion ? undefined : fadeUp} className="mb-3 font-sans text-3xl font-bold tracking-tight text-[var(--gridnest-text-primary)]">
          Token Explorer
        </motion.h1>
        <motion.p variants={shouldReduceMotion ? undefined : fadeUp} className="max-w-2xl text-[var(--gridnest-text-secondary)]">
          CSS variables for color, type, space, radius, elevation, and motion. Copy variables directly, then compose them into predictable product UI.
        </motion.p>
      </motion.div>

      <section className="mb-12 grid grid-cols-1 gap-4 lg:grid-cols-3">
        {USAGE_RECIPES.map((recipe) => (
          <button
            key={recipe.title}
            onClick={() => handleCopy(recipe.code)}
            className="rounded-[var(--gridnest-radius-lg)] border border-[var(--gridnest-border)] bg-[var(--gridnest-surface)] p-5 text-left transition-colors hover:border-[var(--gridnest-accent)]"
          >
            <p className="mb-2 text-sm font-semibold text-[var(--gridnest-text-primary)]">{recipe.title}</p>
            <code className="block text-xs leading-relaxed text-[var(--gridnest-text-secondary)]">{recipe.code}</code>
          </button>
        ))}
      </section>

      <div className="space-y-14">
        {allTokenGroups.map((section) => (
          <section key={section.label}>
            <div className="mb-6 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="font-sans text-lg font-semibold text-[var(--gridnest-text-primary)]">{section.label}</h2>
                <p className="text-sm text-[var(--gridnest-text-secondary)]">{section.description}</p>
              </div>
              <span className="text-xs text-[var(--gridnest-text-muted)]">{section.tokens.length} tokens</span>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              {section.tokens.map((token) => (
                <button
                  key={token.cssVar}
                  onClick={() => handleCopy(token.cssVar)}
                  className="group flex min-w-0 flex-col rounded-[var(--gridnest-radius-lg)] border border-[var(--gridnest-border)] bg-[var(--gridnest-surface)] p-4 text-left transition-all hover:border-[var(--gridnest-accent)] hover:shadow-[var(--gridnest-shadow-glow)]"
                >
                  <div className="mb-3 flex items-start justify-between gap-3">
                    <TokenPreview token={token} />
                    <span className="text-[var(--gridnest-text-muted)] transition-colors group-hover:text-[var(--gridnest-accent)]">
                      {copiedToken === token.cssVar ? <Check size={14} /> : <Copy size={14} />}
                    </span>
                  </div>
                  <span className="mb-0.5 text-[10px] font-mono uppercase tracking-wider text-[var(--gridnest-text-muted)]">{token.name}</span>
                  <span className="break-all text-xs font-medium text-[var(--gridnest-text-primary)]">{token.cssVar}</span>
                  <span className="mt-2 break-all text-[10px] font-mono text-[var(--gridnest-text-secondary)]">
                    {token.value}
                  </span>
                </button>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
