'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { staggerContainer, fadeUp } from '@/lib/motion'
import { Copy, Check } from 'lucide-react'
import { useState } from 'react'
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard'

const TOKEN_SECTIONS = [
  {
    title: 'Colors',
    description: 'The foundation of ForgeUI visual identity.',
    tokens: [
      { name: '--forge-bg', value: '#0A0A0B', label: 'Background' },
      { name: '--forge-surface', value: '#111113', label: 'Surface' },
      { name: '--forge-accent', value: '#6366F1', label: 'Accent' },
      { name: '--forge-text-primary', value: '#F0F0F2', label: 'Text Primary' },
      { name: '--forge-border', value: '#2A2A2E', label: 'Border' },
      { name: '--forge-danger', value: '#EF4444', label: 'Danger' },
    ]
  },
  {
    title: 'Radius',
    description: 'Border radius tokens for consistent rounding.',
    tokens: [
      { name: '--forge-radius-sm', value: '4px', label: 'Small' },
      { name: '--forge-radius-md', value: '8px', label: 'Medium' },
      { name: '--forge-radius-lg', value: '12px', label: 'Large' },
      { name: '--forge-radius-full', value: '9999px', label: 'Full' },
    ]
  },
  {
    title: 'Shadows',
    description: 'Elevation and glow tokens.',
    tokens: [
      { name: '--forge-shadow-sm', value: '0 1px 3px rgba(0,0,0,0.4)', label: 'Small' },
      { name: '--forge-shadow-md', value: '0 4px 16px rgba(0,0,0,0.5)', label: 'Medium' },
      { name: '--forge-shadow-glow', value: '0 0 24px rgba(99,102,241,0.2)', label: 'Accent Glow' },
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
        <motion.p variants={shouldReduceMotion ? undefined : fadeUp} className="text-xs font-mono uppercase tracking-widest text-[var(--forge-text-muted)] mb-2">
          Design Tokens
        </motion.p>
        <motion.h1 variants={shouldReduceMotion ? undefined : fadeUp} className="font-sans text-3xl font-bold text-[var(--forge-text-primary)] tracking-tight mb-3">
          Token Explorer
        </motion.h1>
        <motion.p variants={shouldReduceMotion ? undefined : fadeUp} className="text-[var(--forge-text-secondary)] max-w-lg">
          A centralized system of CSS variables that power the entire library.
          Click any token to copy its variable name.
        </motion.p>
      </motion.div>

      <div className="space-y-16">
        {TOKEN_SECTIONS.map((section) => (
          <section key={section.title}>
            <div className="mb-6">
              <h2 className="font-sans text-lg font-semibold text-[var(--forge-text-primary)]">{section.title}</h2>
              <p className="text-sm text-[var(--forge-text-secondary)]">{section.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {section.tokens.map((token) => (
                <button
                  key={token.name}
                  onClick={() => handleCopy(token.name)}
                  className="group flex flex-col text-left rounded-[var(--forge-radius-lg)] border border-[var(--forge-border)] bg-[var(--forge-surface)] p-4 transition-all hover:border-[var(--forge-accent)] hover:shadow-[var(--forge-shadow-glow)]"
                >
                  <div className="flex items-start justify-between mb-3">
                    {section.title === 'Colors' ? (
                      <div 
                        className="h-10 w-10 rounded-[var(--forge-radius-md)] border border-[var(--forge-border)]"
                        style={{ backgroundColor: token.value }}
                      />
                    ) : section.title === 'Radius' ? (
                      <div 
                        className="h-10 w-10 border border-[var(--forge-accent)] bg-[var(--forge-accent-subtle)]"
                        style={{ borderRadius: token.value }}
                      />
                    ) : (
                      <div 
                        className="h-10 w-10 rounded-[var(--forge-radius-md)] bg-[var(--forge-surface-2)]"
                        style={{ boxShadow: token.value }}
                      />
                    )}
                    <div className="text-[var(--forge-text-muted)] group-hover:text-[var(--forge-accent)] transition-colors">
                      {copiedToken === token.name ? <Check size={14} /> : <Copy size={14} />}
                    </div>
                  </div>
                  
                  <span className="text-[10px] font-mono text-[var(--forge-text-muted)] mb-0.5">{token.label}</span>
                  <span className="text-xs font-mono font-medium text-[var(--forge-text-primary)]">{token.name}</span>
                  <span className="mt-2 text-[10px] font-mono text-[var(--forge-text-secondary)] opacity-0 group-hover:opacity-100 transition-opacity">
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
