'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Zap } from 'lucide-react'
import { staggerContainer, fadeUp, scaleIn } from '@/lib/motion'

function GithubIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.73.083-.73 1.205.085 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.605-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.298 24 12c0-6.627-5.373-12-12-12" />
    </svg>
  )
}

const BUTTON_VARIANTS = ['primary', 'secondary', 'ghost', 'danger'] as const
type BtnVariant = (typeof BUTTON_VARIANTS)[number]

const variantStyles: Record<BtnVariant, string> = {
  primary: 'bg-[var(--gridnest-accent)] text-white shadow-[var(--gridnest-shadow-glow)] hover:bg-[var(--gridnest-accent-hover)]',
  secondary: 'bg-[var(--gridnest-surface-2)] text-[var(--gridnest-text-primary)] border border-[var(--gridnest-border)] hover:border-[var(--gridnest-border-hover)]',
  ghost: 'text-[var(--gridnest-text-secondary)] hover:bg-[var(--gridnest-surface-2)] hover:text-[var(--gridnest-text-primary)]',
  danger: 'bg-[var(--gridnest-danger)] text-white hover:opacity-90',
}

const STATS = [
  { value: '14', label: 'Components' },
  { value: '100%', label: 'TypeScript' },
  { value: 'WCAG 2.1', label: 'Accessible' },
  { value: 'MIT', label: 'Licensed' },
]

export function Hero() {
  const shouldReduceMotion = useReducedMotion()
  const [activeVariant, setActiveVariant] = useState<BtnVariant>('primary')
  const cycleRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    cycleRef.current = setInterval(() => {
      setActiveVariant((prev) => {
        const idx = BUTTON_VARIANTS.indexOf(prev)
        return BUTTON_VARIANTS[(idx + 1) % BUTTON_VARIANTS.length]
      })
    }, 1800)
    return () => { if (cycleRef.current) clearInterval(cycleRef.current) }
  }, [])

  return (
    <div className="relative overflow-hidden">
      {/* Grid background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(var(--gridnest-text-primary) 1px, transparent 1px),
            linear-gradient(90deg, var(--gridnest-text-primary) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Floating gradient orbs */}
      <div className="pointer-events-none absolute -top-32 left-1/4 h-96 w-96 rounded-full bg-[var(--gridnest-accent)] opacity-[0.06] blur-[100px]" />
      <div className="pointer-events-none absolute top-48 right-1/4 h-64 w-64 rounded-full bg-[var(--gridnest-accent-hover)] opacity-[0.04] blur-[80px]" />

      {/* Hero content */}
      <motion.div
        variants={shouldReduceMotion ? undefined : staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative z-10 pt-16 pb-24"
      >
        {/* Badge */}
        <motion.div
          variants={shouldReduceMotion ? undefined : fadeUp}
          className="mb-8 flex items-center gap-2"
        >
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--gridnest-border)] bg-[var(--gridnest-surface)] px-3 py-1 text-xs text-[var(--gridnest-text-secondary)]">
            <Zap size={10} className="text-[var(--gridnest-accent)]" />
            14 production-grade components - copy-paste ready
          </span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left - Typography */}
          <div>
            <motion.h1
              variants={shouldReduceMotion ? undefined : fadeUp}
              className="font-sans text-5xl lg:text-6xl font-bold tracking-tight text-[var(--gridnest-text-primary)] leading-[1.08] mb-6"
            >
              Build UI.{' '}
              <br />
              <span
                className="relative"
                style={{
                  background: 'linear-gradient(135deg, var(--gridnest-accent) 0%, var(--gridnest-accent-hover) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Ship faster.
              </span>
            </motion.h1>

            <motion.p
              variants={shouldReduceMotion ? undefined : fadeUp}
              className="text-lg text-[var(--gridnest-text-secondary)] leading-relaxed mb-10 max-w-md"
            >
              GridNest is a design system built with editorial precision and developer
              utility in mind. 14 accessible, animated, TypeScript-first components
              ready for production.
            </motion.p>

            <motion.div
              variants={shouldReduceMotion ? undefined : fadeUp}
              className="flex flex-wrap gap-3"
            >
              <Link
                href="/components"
                id="hero-explore-btn"
                className="inline-flex items-center gap-2 h-11 px-5 rounded-[var(--gridnest-radius-md)] bg-[var(--gridnest-accent)] text-white text-sm font-medium hover:bg-[var(--gridnest-accent-hover)] transition-colors shadow-[var(--gridnest-shadow-glow)]"
              >
                Explore Components
                <ArrowRight size={14} />
              </Link>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                id="hero-github-btn"
                className="inline-flex items-center gap-2 h-11 px-5 rounded-[var(--gridnest-radius-md)] border border-[var(--gridnest-border)] text-[var(--gridnest-text-secondary)] text-sm font-medium hover:text-[var(--gridnest-text-primary)] hover:border-[var(--gridnest-border-hover)] transition-colors"
              >
                <GithubIcon size={14} />
                View on GitHub
              </a>
            </motion.div>
          </div>

          {/* Right - Live Component Preview */}
          <motion.div
            variants={shouldReduceMotion ? undefined : scaleIn}
            className="relative"
          >
            <div className="rounded-[var(--gridnest-radius-xl)] border border-[var(--gridnest-border)] bg-[var(--gridnest-surface)] p-8 shadow-[var(--gridnest-shadow-md)]">
              <p className="mb-1 text-[10px] font-mono uppercase tracking-widest text-[var(--gridnest-text-muted)]">
                Live preview
              </p>
              <p className="mb-6 text-xs text-[var(--gridnest-text-secondary)]">
                Button - variant: <code className="font-mono text-[var(--gridnest-accent)]">{activeVariant}</code>
              </p>

              <div className="flex flex-wrap gap-3 mb-8">
                {BUTTON_VARIANTS.map((v) => (
                  <button
                    key={v}
                    id={`hero-variant-${v}`}
                    onClick={() => setActiveVariant(v)}
                    className={`h-9 px-4 text-sm font-medium rounded-[var(--gridnest-radius-md)] transition-all duration-200 ${variantStyles[v]} ${activeVariant === v ? 'ring-2 ring-[var(--gridnest-accent)] ring-offset-2 ring-offset-[var(--gridnest-surface)]' : ''
                      }`}
                  >
                    {v.charAt(0).toUpperCase() + v.slice(1)}
                  </button>
                ))}
              </div>

              {/* Component code snippet */}
              <div className="rounded-[var(--gridnest-radius-md)] bg-[#0D0D0F] p-4 font-mono text-xs">
                <span className="text-[#818CF8]">import</span>
                <span className="text-[var(--gridnest-text-secondary)]"> {'{ Button }'} </span>
                <span className="text-[#818CF8]">from</span>
                <span className="text-[#86EFAC]"> &apos;@/components/forge&apos;</span>
                <br /><br />
                <span className="text-[#67E8F9]">&lt;Button</span>
                <span className="text-[var(--gridnest-text-secondary)]"> variant=</span>
                <span className="text-[#86EFAC]">&quot;{activeVariant}&quot;</span>
                <span className="text-[#67E8F9]">&gt;</span>
                <span className="text-[var(--gridnest-text-secondary)]">Click me</span>
                <span className="text-[#67E8F9]">&lt;/Button&gt;</span>
              </div>
            </div>

            {/* Decorative dots */}
            <div className="absolute -right-4 -top-4 grid grid-cols-4 gap-1.5">
              {Array.from({ length: 16 }).map((_, i) => (
                <div key={i} className="h-1 w-1 rounded-full bg-[var(--gridnest-border)]" />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Stats row */}
        <motion.div
          variants={shouldReduceMotion ? undefined : fadeUp}
          className="mt-20 grid grid-cols-2 sm:grid-cols-4 gap-px border border-[var(--gridnest-border)] rounded-[var(--gridnest-radius-lg)] overflow-hidden"
        >
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center justify-center py-6 bg-[var(--gridnest-surface)] hover:bg-[var(--gridnest-surface-2)] transition-colors"
            >
              <span className="font-sans text-2xl font-bold text-[var(--gridnest-text-primary)] tracking-tight">
                {stat.value}
              </span>
              <span className="mt-1 text-xs text-[var(--gridnest-text-muted)]">{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  )
}
