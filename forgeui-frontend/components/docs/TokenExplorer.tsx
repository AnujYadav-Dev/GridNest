'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { staggerContainer, fadeUp } from '@/lib/motion'
import { Copy, Check } from 'lucide-react'
import { useState } from 'react'
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard'

const TOKEN_SECTIONS = [
  {
    title: 'Colors',
    description: 'The foundation of GridNest visual identity.',
    tokens: [
      { name: '--gridnest-bg', value: '#0A0A0B', label: 'Background' },
      { name: '--gridnest-surface', value: '#111113', label: 'Surface' },
      { name: '--gridnest-accent', value: '#6366F1', label: 'Accent' },
      { name: '--gridnest-text-primary', value: '#F0F0F2', label: 'Text Primary' },
      { name: '--gridnest-border', value: '#2A2A2E', label: 'Border' },
      { name: '--gridnest-danger', value: '#EF4444', label: 'Danger' },
    ]
  },
  {
    title: 'Radius',
    description: 'Border radius tokens for consistent rounding.',
    tokens: [
      { name: '--gridnest-radius-sm', value: '4px', label: 'Small' },
      { name: '--gridnest-radius-md', value: '8px', label: 'Medium' },
      { name: '--gridnest-radius-lg', value: '12px', label: 'Large' },
      { name: '--gridnest-radius-full', value: '9999px', label: 'Full' },
    ]
  },
  {
    title: 'Shadows',
    description: 'Elevation and glow tokens.',
    tokens: [
      { name: '--gridnest-shadow-sm', value: '0 1px 3px rgba(0,0,0,0.4)', label: 'Small' },
      { name: '--gridnest-shadow-md', value: '0 4px 16px rgba(0,0,0,0.5)', label: 'Medium' },
      { name: '--gridnest-shadow-glow', value: '0 0 24px rgba(99,102,241,0.2)', label: 'Accent Glow' },
    ]
  }
]

export default function TokenExplorer() {
  const { copy } = useCopyToClipboard()
  const [copiedToken, setCopiedToken] = useState<string | null>(null)
  const shouldReduceMotion = useReducedMotion()

  const handleCopy = (val: string) => {
    copy(val)
    setCopiedToken(val)
    setTimeout(() => setCopiedToken(null), 2000)
  }

  return (
    <div>
      <motion.div
        variants={shouldReduceMotion ? undefined : staggerContainer}
        initial="hidden"
        animate="visible"
        className="mb-12"
      >
        <motion.p variants={shouldReduceMotion ? undefined : fadeUp} className="text-xs font-mono uppercase tracking-widest text-[var(--gridnest-text-muted)] mb-2">
          Design Tokens
        </motion.p>
        <motion.h1 variants={shouldReduceMotion ? undefined : fadeUp} className="font-sans text-3xl font-bold text-[var(--gridnest-text-primary)] tracking-tight mb-3">
          Token Explorer
        </motion.h1>
        <motion.p variants={shouldReduceMotion ? undefined : fadeUp} className="text-[var(--gridnest-text-secondary)] max-w-lg">
          A centralized system of CSS variables that power the entire library.
          Click any token to copy its variable name.
        </motion.p>
      </motion.div>

      <div className="space-y-16">
        {TOKEN_SECTIONS.map((section) => (
          <section key={section.title}>
            <div className="mb-6">
              <h2 className="font-sans text-lg font-semibold text-[var(--gridnest-text-primary)]">{section.title}</h2>
              <p className="text-sm text-[var(--gridnest-text-secondary)]">{section.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {section.tokens.map((token) => (
                <button
                  key={token.name}
                  onClick={() => handleCopy(token.name)}
                  className="group flex flex-col text-left rounded-[var(--gridnest-radius-lg)] border border-[var(--gridnest-border)] bg-[var(--gridnest-surface)] p-4 transition-all hover:border-[var(--gridnest-accent)] hover:shadow-[var(--gridnest-shadow-glow)]"
                >
                  <div className="flex items-start justify-between mb-3">
                    {section.title === 'Colors' ? (
                      <div 
                        className="h-10 w-10 rounded-[var(--gridnest-radius-md)] border border-[var(--gridnest-border)]"
                        style={{ backgroundColor: token.value }}
                      />
                    ) : section.title === 'Radius' ? (
                      <div 
                        className="h-10 w-10 border border-[var(--gridnest-accent)] bg-[var(--gridnest-accent-subtle)]"
                        style={{ borderRadius: token.value }}
                      />
                    ) : (
                      <div 
                        className="h-10 w-10 rounded-[var(--gridnest-radius-md)] bg-[var(--gridnest-surface-2)]"
                        style={{ boxShadow: token.value }}
                      />
                    )}
                    <div className="text-[var(--gridnest-text-muted)] group-hover:text-[var(--gridnest-accent)] transition-colors">
                      {copiedToken === token.name ? <Check size={14} /> : <Copy size={14} />}
                    </div>
                  </div>
                  
                  <span className="text-[10px] font-mono text-[var(--gridnest-text-muted)] mb-0.5">{token.label}</span>
                  <span className="text-xs font-mono font-medium text-[var(--gridnest-text-primary)]">{token.name}</span>
                  <span className="mt-2 text-[10px] font-mono text-[var(--gridnest-text-secondary)] opacity-0 group-hover:opacity-100 transition-opacity">
                    Value: {token.value}
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
