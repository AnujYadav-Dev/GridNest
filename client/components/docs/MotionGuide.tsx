'use client'

import { useState } from 'react'
import { RotateCcw } from 'lucide-react'
import { useReducedMotion, motion, Easing } from 'framer-motion'
import { staggerContainer, fadeUp, scaleIn, clipReveal } from '@/lib/motion'
import { CodeBlock } from '@/components/docs/CodeBlock'

const EASING_DEMOS: { label: string; value: Easing; color: string }[] = [
  { label: 'gridnest-out', value: [0.16, 1, 0.3, 1], color: 'var(--gridnest-accent)' },
  { label: 'gridnest-spring', value: [0.34, 1.56, 0.64, 1], color: 'var(--gridnest-success)' },
  { label: 'ease-in-out (default)', value: 'easeInOut', color: 'var(--gridnest-warning)' },
]

const VARIANTS_GALLERY = [
  {
    label: 'fadeUp',
    description: 'opacity + y translate reveal. Used on headlines and body text.',
    code: `import { motion } from 'framer-motion'
import { fadeUp } from '@/lib/motion'

<motion.h1 variants={fadeUp} initial="hidden" animate="visible">
  Hello World
</motion.h1>`,
    variant: fadeUp,
  },
  {
    label: 'scaleIn',
    description: 'scale + opacity entrance. Used on cards, modals, and preview panels.',
    code: `import { motion } from 'framer-motion'
import { scaleIn } from '@/lib/motion'

<motion.div variants={scaleIn} initial="hidden" animate="visible">
  <Card>Content</Card>
</motion.div>`,
    variant: scaleIn,
  },
  {
    label: 'clipReveal',
    description: 'Horizontal clip-path text reveal. Used for editorial headlines.',
    code: `import { motion } from 'framer-motion'
import { clipReveal } from '@/lib/motion'

<motion.span variants={clipReveal} initial="hidden" animate="visible">
  Editorial text
</motion.span>`,
    variant: clipReveal,
  },
]

const MOTION_RECIPES = [
  { component: 'Button', trigger: 'press / hover', duration: '150ms', guidance: 'Use tiny scale or y movement only.' },
  { component: 'Dropdown', trigger: 'open / close', duration: '150-200ms', guidance: 'Fade and scale from trigger origin.' },
  { component: 'Modal', trigger: 'enter / exit', duration: '250-300ms', guidance: 'Pair backdrop fade with panel scale.' },
  { component: 'Lists', trigger: 'page reveal', duration: '400ms', guidance: 'Use staggerContainer with short child delay.' },
]

const TIMING_SCALE = [
  { label: 'Fast', value: '150ms', use: 'Tap, hover, icon swaps' },
  { label: 'Normal', value: '250ms', use: 'Menus, popovers, inline feedback' },
  { label: 'Slow', value: '400ms', use: 'Page sections, larger layout reveals' },
]

export default function MotionPage() {
  const shouldReduceMotion = useReducedMotion()
  const [replayKey, setReplayKey] = useState(0)

  return (
    <div>
      {/* Header */}
      <motion.div
        variants={shouldReduceMotion ? undefined : staggerContainer}
        initial="hidden"
        animate="visible"
        className="mb-12"
      >
        <motion.p variants={shouldReduceMotion ? undefined : fadeUp} className="text-xs font-mono uppercase tracking-widest text-[var(--gridnest-text-muted)] mb-2">
          Animation System
        </motion.p>
        <motion.h1 variants={shouldReduceMotion ? undefined : fadeUp} className="font-sans text-3xl font-bold text-[var(--gridnest-text-primary)] tracking-tight mb-3">
          Motion Guide
        </motion.h1>
        <motion.p variants={shouldReduceMotion ? undefined : fadeUp} className="text-[var(--gridnest-text-secondary)] max-w-md">
          Motion should be felt, not seen. All animation variants live in{' '}
          <code className="font-mono text-xs text-[var(--gridnest-accent)]">lib/motion.ts</code> -
          never defined inline in components.
        </motion.p>
      </motion.div>

      {/* Philosophy */}
      <section className="mb-12">
        <h2 className="font-sans text-lg font-semibold text-[var(--gridnest-text-primary)] mb-4">Philosophy</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { rule: 'Purposeful', desc: 'Every animation communicates state change, hierarchy, or direction.' },
            { rule: 'Proportional', desc: 'Short transitions for small elements, longer for full-page changes.' },
            { rule: 'Respectful', desc: 'All animations respect prefers-reduced-motion OS setting.' },
          ].map((p) => (
            <div key={p.rule} className="rounded-[var(--gridnest-radius-md)] border border-[var(--gridnest-border)] bg-[var(--gridnest-surface)] p-5">
              <p className="font-sans font-semibold text-sm text-[var(--gridnest-accent)] mb-2">{p.rule}</p>
              <p className="text-xs text-[var(--gridnest-text-secondary)] leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Easing Curves */}
      <section className="mb-12">
        <h2 className="font-sans text-lg font-semibold text-[var(--gridnest-text-primary)] mb-6">Easing Curves</h2>
        <div className="space-y-4">
          {EASING_DEMOS.map((ease) => (
            <div key={ease.label} className="flex items-center gap-6 rounded-[var(--gridnest-radius-md)] border border-[var(--gridnest-border)] bg-[var(--gridnest-surface)] p-5">
              <div className="w-40 shrink-0">
                <p className="text-xs font-mono text-[var(--gridnest-text-primary)] mb-1">{ease.label}</p>
                <p className="text-[10px] font-mono text-[var(--gridnest-text-muted)]">{Array.isArray(ease.value) ? `cubic-bezier(${(ease.value as number[]).join(', ')})` : String(ease.value)}</p>
              </div>
              <div className="flex-1 h-8 rounded-full bg-[var(--gridnest-surface-2)] relative overflow-hidden">
                <motion.div
                  className="absolute left-1 top-1 h-6 w-6 rounded-full"
                  style={{ backgroundColor: ease.color }}
                  animate={shouldReduceMotion ? { left: '50%', x: '-50%' } : { left: ['4px', '85%', '4px'] }}
                  transition={{
                    duration: 2,
                    repeat: shouldReduceMotion ? 0 : Infinity,
                    repeatType: 'reverse',
                    ease: ease.value,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Timing Scale */}
      <section className="mb-12">
        <h2 className="mb-6 font-sans text-lg font-semibold text-[var(--gridnest-text-primary)]">Timing Scale</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {TIMING_SCALE.map((item) => (
            <div key={item.label} className="rounded-[var(--gridnest-radius-lg)] border border-[var(--gridnest-border)] bg-[var(--gridnest-surface)] p-5">
              <p className="text-sm font-semibold text-[var(--gridnest-text-primary)]">{item.label}</p>
              <p className="mt-1 font-mono text-2xl font-bold text-[var(--gridnest-accent)]">{item.value}</p>
              <p className="mt-3 text-xs leading-relaxed text-[var(--gridnest-text-secondary)]">{item.use}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Component Recipes */}
      <section className="mb-12">
        <h2 className="mb-6 font-sans text-lg font-semibold text-[var(--gridnest-text-primary)]">Component Recipes</h2>
        <div className="overflow-hidden rounded-[var(--gridnest-radius-lg)] border border-[var(--gridnest-border)] bg-[var(--gridnest-surface)]">
          <div className="grid grid-cols-[1fr_1fr_0.8fr_1.5fr] gap-4 border-b border-[var(--gridnest-border)] bg-[var(--gridnest-surface-2)] px-4 py-3 text-[10px] font-semibold uppercase tracking-wider text-[var(--gridnest-text-muted)] max-md:hidden">
            <span>Component</span>
            <span>Trigger</span>
            <span>Duration</span>
            <span>Guidance</span>
          </div>
          {MOTION_RECIPES.map((recipe) => (
            <div key={recipe.component} className="grid grid-cols-1 gap-2 border-b border-[var(--gridnest-border)] px-4 py-4 text-sm last:border-b-0 md:grid-cols-[1fr_1fr_0.8fr_1.5fr] md:gap-4">
              <span className="font-medium text-[var(--gridnest-text-primary)]">{recipe.component}</span>
              <span className="text-[var(--gridnest-text-secondary)]">{recipe.trigger}</span>
              <span className="font-mono text-xs text-[var(--gridnest-accent)]">{recipe.duration}</span>
              <span className="text-[var(--gridnest-text-secondary)]">{recipe.guidance}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Variants Gallery */}
      <section className="mb-12">
        <h2 className="font-sans text-lg font-semibold text-[var(--gridnest-text-primary)] mb-6">Variants Gallery</h2>
        <div className="space-y-8">
          {VARIANTS_GALLERY.map((v) => (
            <div key={v.label} className="rounded-[var(--gridnest-radius-lg)] border border-[var(--gridnest-border)] overflow-hidden">
              <div className="flex items-start justify-between gap-4 border-b border-[var(--gridnest-border)] bg-[var(--gridnest-surface)] px-5 py-4">
                <div>
                  <p className="font-mono text-sm font-medium text-[var(--gridnest-text-primary)]">{v.label}</p>
                  <p className="text-xs text-[var(--gridnest-text-secondary)] mt-0.5">{v.description}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setReplayKey((key) => key + 1)}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[var(--gridnest-radius-sm)] text-[var(--gridnest-text-muted)] transition-colors hover:bg-[var(--gridnest-surface-2)] hover:text-[var(--gridnest-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gridnest-accent)]"
                  aria-label={`Replay ${v.label} animation`}
                >
                  <RotateCcw size={14} />
                </button>
              </div>

              {/* Live demo */}
              <div className="flex items-center justify-center min-h-28 bg-[var(--gridnest-bg)] p-6 border-b border-[var(--gridnest-border)]">
                <motion.div
                  key={`${v.label}-${replayKey}`}
                  variants={shouldReduceMotion ? undefined : v.variant}
                  initial={shouldReduceMotion ? false : 'hidden'}
                  animate={shouldReduceMotion ? undefined : 'visible'}
                  className="px-6 py-3 rounded-[var(--gridnest-radius-md)] bg-[var(--gridnest-surface)] border border-[var(--gridnest-border)] text-sm text-[var(--gridnest-text-primary)]"
                >
                  Animated element
                </motion.div>
              </div>

              {/* Code */}
              <CodeBlock code={v.code} showLineNumbers={false} />
            </div>
          ))}
        </div>
      </section>

      {/* Do / Don't */}
      <section className="mb-12">
        <h2 className="font-sans text-lg font-semibold text-[var(--gridnest-text-primary)] mb-6">Do / Don&apos;t</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="rounded-[var(--gridnest-radius-lg)] border border-[var(--gridnest-success)]/30 bg-[var(--gridnest-success)]/5 p-5">
            <p className="text-xs font-semibold text-[var(--gridnest-success)] uppercase tracking-wider mb-3">Do</p>
            <ul className="space-y-2">
              {[
                'Import variants from lib/motion.ts',
                'Use staggerContainer for list reveals',
                'Respect useReducedMotion()',
                'Keep durations under 500ms for UI',
              ].map((d) => (
                <li key={d} className="text-xs text-[var(--gridnest-text-secondary)] flex items-start gap-2">
                  <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-[var(--gridnest-success)]" />
                  {d}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-[var(--gridnest-radius-lg)] border border-[var(--gridnest-danger)]/30 bg-[var(--gridnest-danger)]/5 p-5">
            <p className="text-xs font-semibold text-[var(--gridnest-danger)] uppercase tracking-wider mb-3">Don&apos;t</p>
            <ul className="space-y-2">
              {[
                'Define animation variants inline in components',
                'Animate on every scroll event',
                'Use durations > 700ms for UI feedback',
                'Animate layout-triggering properties (width, height)',
              ].map((d) => (
                <li key={d} className="text-xs text-[var(--gridnest-text-secondary)] flex items-start gap-2">
                  <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-[var(--gridnest-danger)]" />
                  {d}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}
