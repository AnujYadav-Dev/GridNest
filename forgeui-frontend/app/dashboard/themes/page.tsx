'use client'

import { useState, CSSProperties } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Plus, Download, Save } from 'lucide-react'
import { staggerContainer, fadeUp } from '@/lib/motion'
import { useForgeStore } from '@/store/useForgeStore'

const TOKEN_PICKERS = [
  { cssVar: '--forge-accent', label: 'Accent Color', defaultValue: '#6366F1' },
  { cssVar: '--forge-bg', label: 'Background', defaultValue: '#0A0A0B' },
  { cssVar: '--forge-surface', label: 'Surface', defaultValue: '#111113' },
  { cssVar: '--forge-text-primary', label: 'Text Primary', defaultValue: '#F0F0F2' },
  { cssVar: '--forge-text-secondary', label: 'Text Secondary', defaultValue: '#8A8A92' },
  { cssVar: '--forge-border', label: 'Border', defaultValue: '#2A2A2E' },
]

function generateCSSExport(prefs: Record<string, string>): string {
  const overrides = TOKEN_PICKERS.map((t) => {
    const val = prefs[t.cssVar] ?? t.defaultValue
    return `  ${t.cssVar}: ${val};`
  }).join('\n')

  return `:root {\n${overrides}\n}`
}

export default function ThemesPage() {
  const { themePrefs, setThemePref, resetThemePrefs } = useForgeStore()
  const [themeName, setThemeName] = useState('My Theme')
  const [saved, setSaved] = useState(false)
  const shouldReduceMotion = useReducedMotion()

  // Build live preview CSS vars as inline style
  const previewStyle: CSSProperties = TOKEN_PICKERS.reduce<CSSProperties>((acc, t) => {
    (acc as Record<string, string>)[t.cssVar] = themePrefs[t.cssVar] ?? t.defaultValue
    return acc
  }, {})

  function handleExport() {
    const css = generateCSSExport(themePrefs)
    const blob = new Blob([css], { type: 'text/css' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${themeName.replace(/\s+/g, '-').toLowerCase()}-tokens.css`
    a.click()
    URL.revokeObjectURL(url)
  }

  function handleSave() {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
    // POST /api/themes/ would go here when backend is connected
  }

  return (
    <motion.div
      variants={shouldReduceMotion ? undefined : staggerContainer}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={shouldReduceMotion ? undefined : fadeUp} className="mb-8">
        <p className="text-xs font-mono uppercase tracking-widest text-[var(--forge-text-muted)] mb-1">Dashboard</p>
        <h1 className="font-sans text-2xl font-bold text-[var(--forge-text-primary)] tracking-tight mb-1">
          Theme Builder
        </h1>
        <p className="text-sm text-[var(--forge-text-secondary)]">
          Customize ForgeUI tokens and export as a CSS override file.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Controls */}
        <motion.div variants={shouldReduceMotion ? undefined : fadeUp}>
          <div className="rounded-[var(--forge-radius-lg)] border border-[var(--forge-border)] bg-[var(--forge-surface)] p-6">
            <h2 className="font-sans text-sm font-semibold text-[var(--forge-text-primary)] mb-5">Token Overrides</h2>

            <div className="space-y-4">
              {TOKEN_PICKERS.map((t) => {
                const value = themePrefs[t.cssVar] ?? t.defaultValue
                return (
                  <div key={t.cssVar}>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-medium text-[var(--forge-text-primary)]">{t.label}</label>
                      <code className="text-[10px] font-mono text-[var(--forge-text-muted)]">{t.cssVar}</code>
                    </div>
                    <div className="flex items-center gap-3">
                      <input
                        id={`color-picker-${t.cssVar.replace('--', '')}`}
                        type="color"
                        value={value}
                        onChange={(e) => setThemePref(t.cssVar, e.target.value)}
                        className="h-9 w-12 cursor-pointer rounded-[var(--forge-radius-sm)] border border-[var(--forge-border)] bg-transparent p-0.5"
                      />
                      <input
                        type="text"
                        value={value}
                        onChange={(e) => setThemePref(t.cssVar, e.target.value)}
                        className="flex-1 rounded-[var(--forge-radius-md)] border border-[var(--forge-border)] bg-[var(--forge-bg)] px-3 py-2 text-xs font-mono text-[var(--forge-text-primary)] outline-none focus:ring-1 focus:ring-[var(--forge-accent)]"
                      />
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="mt-6 flex gap-2">
              <button
                id="reset-theme"
                onClick={resetThemePrefs}
                className="flex-1 h-8 text-xs rounded-[var(--forge-radius-md)] border border-[var(--forge-border)] text-[var(--forge-text-secondary)] hover:text-[var(--forge-text-primary)] hover:border-[var(--forge-border-hover)] transition-colors"
              >
                Reset
              </button>
              <button
                id="export-theme-css"
                onClick={handleExport}
                className="flex items-center gap-1.5 px-3 h-8 text-xs rounded-[var(--forge-radius-md)] border border-[var(--forge-border)] text-[var(--forge-text-secondary)] hover:text-[var(--forge-text-primary)] hover:border-[var(--forge-border-hover)] transition-colors"
              >
                <Download size={12} />
                Export CSS
              </button>
              <button
                id="save-theme"
                onClick={handleSave}
                className="flex items-center gap-1.5 px-3 h-8 text-xs rounded-[var(--forge-radius-md)] bg-[var(--forge-accent)] text-white hover:bg-[var(--forge-accent-hover)] transition-colors"
              >
                <Save size={12} />
                {saved ? 'Saved!' : 'Save'}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Live Preview */}
        <motion.div variants={shouldReduceMotion ? undefined : fadeUp}>
          <div className="rounded-[var(--forge-radius-lg)] border border-[var(--forge-border)] overflow-hidden">
            <div className="border-b border-[var(--forge-border)] bg-[var(--forge-surface)] px-4 py-3">
              <p className="text-xs font-medium text-[var(--forge-text-secondary)]">Live Preview</p>
            </div>
            <div className="p-6" style={previewStyle}>
              <div
                className="rounded-lg border p-5 space-y-4"
                style={{
                  background: 'var(--forge-surface)',
                  borderColor: 'var(--forge-border)',
                }}
              >
                <div className="flex items-center gap-2">
                  <div
                    className="h-8 w-8 rounded-lg flex items-center justify-center text-xs font-bold font-mono text-white"
                    style={{ background: 'var(--forge-accent)' }}
                  >
                    FG
                  </div>
                  <span className="text-sm font-semibold" style={{ color: 'var(--forge-text-primary)' }}>
                    ForgeUI
                  </span>
                  <span
                    className="ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full text-white"
                    style={{ background: 'var(--forge-accent)' }}
                  >
                    New
                  </span>
                </div>

                <p className="text-sm leading-relaxed" style={{ color: 'var(--forge-text-secondary)' }}>
                  This preview updates live as you change the token values on the left.
                </p>

                <div className="flex gap-2">
                  <button
                    className="h-8 px-3 text-xs font-medium rounded-lg text-white transition-colors"
                    style={{ background: 'var(--forge-accent)' }}
                  >
                    Primary
                  </button>
                  <button
                    className="h-8 px-3 text-xs font-medium rounded-lg transition-colors"
                    style={{
                      background: 'var(--forge-surface-2, #1A1A1E)',
                      color: 'var(--forge-text-primary)',
                      border: '1px solid var(--forge-border)',
                    }}
                  >
                    Secondary
                  </button>
                </div>

                <div
                  className="h-1.5 rounded-full overflow-hidden"
                  style={{ background: 'var(--forge-surface-2, #1A1A1E)' }}
                >
                  <div
                    className="h-full rounded-full w-2/3"
                    style={{ background: 'var(--forge-accent)' }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Theme name input */}
          <div className="mt-4 rounded-[var(--forge-radius-md)] border border-[var(--forge-border)] bg-[var(--forge-surface)] p-4">
            <label htmlFor="theme-name" className="mb-1.5 block text-xs font-medium text-[var(--forge-text-primary)]">
              Theme name
            </label>
            <input
              id="theme-name"
              type="text"
              value={themeName}
              onChange={(e) => setThemeName(e.target.value)}
              className="w-full rounded-[var(--forge-radius-md)] border border-[var(--forge-border)] bg-[var(--forge-bg)] px-3 py-2 text-sm text-[var(--forge-text-primary)] outline-none focus:ring-1 focus:ring-[var(--forge-accent)]"
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
