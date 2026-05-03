'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Copy, Check, Monitor, Sun } from 'lucide-react'
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard'
import { CodeBlock } from './CodeBlock'

interface ComponentPreviewProps {
  children: React.ReactNode
  code: string
  title?: string
}

export function ComponentPreview({ children, code, title }: ComponentPreviewProps) {
  const [tab, setTab] = useState<'preview' | 'code'>('preview')
  const [previewTheme, setPreviewTheme] = useState<'dark' | 'light'>('dark')
  const { copied, copy } = useCopyToClipboard()

  return (
    <div className="rounded-[var(--gridnest-radius-lg)] border border-[var(--gridnest-border)] overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center justify-between border-b border-[var(--gridnest-border)] bg-[var(--gridnest-surface)] px-4 py-2">
        {title && (
          <span className="text-xs text-[var(--gridnest-text-muted)] font-mono">{title}</span>
        )}
        <div className="flex items-center gap-1 ml-auto">
          {/* Tab switcher */}
          {(['preview', 'code'] as const).map((t) => (
            <button
              key={t}
              id={`preview-tab-${t}`}
              onClick={() => setTab(t)}
              className={`px-3 py-1 text-xs rounded-[var(--gridnest-radius-sm)] transition-colors capitalize ${
                tab === t
                  ? 'bg-[var(--gridnest-surface-2)] text-[var(--gridnest-text-primary)]'
                  : 'text-[var(--gridnest-text-muted)] hover:text-[var(--gridnest-text-secondary)]'
              }`}
            >
              {t}
            </button>
          ))}

          <div className="mx-2 h-4 w-px bg-[var(--gridnest-border)]" />

          {/* Preview theme toggle */}
          {tab === 'preview' && (
            <button
              id="preview-theme-toggle"
              onClick={() => setPreviewTheme(previewTheme === 'dark' ? 'light' : 'dark')}
              className="flex items-center justify-center h-6 w-6 rounded-[var(--gridnest-radius-sm)] text-[var(--gridnest-text-muted)] hover:text-[var(--gridnest-text-secondary)] transition-colors"
              aria-label="Toggle preview theme"
            >
              {previewTheme === 'dark' ? <Monitor size={12} /> : <Sun size={12} />}
            </button>
          )}

          {/* Copy code button */}
          <button
            id="copy-code-btn"
            onClick={() => void copy(code)}
            className="flex items-center gap-1.5 px-2 py-1 text-xs rounded-[var(--gridnest-radius-sm)] text-[var(--gridnest-text-muted)] hover:text-[var(--gridnest-text-secondary)] transition-colors"
            aria-label="Copy code"
          >
            <AnimatePresence mode="wait" initial={false}>
              {copied ? (
                <motion.span
                  key="check"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <Check size={12} className="text-[var(--gridnest-success)]" />
                </motion.span>
              ) : (
                <motion.span
                  key="copy"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <Copy size={12} />
                </motion.span>
              )}
            </AnimatePresence>
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>

      {/* Content */}
      <AnimatePresence mode="wait" initial={false}>
        {tab === 'preview' ? (
          <motion.div
            key="preview"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className={`min-h-48 flex items-center justify-center p-8 ${
              previewTheme === 'light'
                ? 'bg-white'
                : 'bg-[var(--gridnest-bg)]'
            }`}
          >
            {children}
          </motion.div>
        ) : (
          <motion.div
            key="code"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <CodeBlock code={code} language="tsx" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
