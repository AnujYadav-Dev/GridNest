'use client'

import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Copy, Check } from 'lucide-react'
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard'

interface CodeBlockProps {
  code: string
  language?: string
  showLineNumbers?: boolean
}

// Simple client-side syntax highlighter using regex
function tokenize(code: string): string {
  return code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    // strings
    .replace(/(["'`])([^"'`\n]*)\1/g, '<span style="color:#86EFAC">$1$2$1</span>')
    // keywords
    .replace(
      /\b(import|export|from|const|let|var|function|return|default|interface|type|extends|implements|class|if|else|for|while|async|await|new|null|undefined|true|false)\b/g,
      '<span style="color:#818CF8">$1</span>'
    )
    // jsx tags
    .replace(/(&lt;\/?)([\w.]+)/g, '$1<span style="color:#67E8F9">$2</span>')
    // comments
    .replace(/(\/\/[^\n]*)/g, '<span style="color:#4B5563">$1</span>')
    // numbers
    .replace(/\b(\d+)\b/g, '<span style="color:#FCA5A5">$1</span>')
}

export function CodeBlock({ code, showLineNumbers = true }: CodeBlockProps) {
  const { copied, copy } = useCopyToClipboard()
  const preRef = useRef<HTMLPreElement>(null)

  useEffect(() => {
    if (preRef.current) {
      preRef.current.innerHTML = tokenize(code)
    }
  }, [code])

  const lines = code.split('\n')

  return (
    <div className="relative group">
      <div className="overflow-x-auto bg-[#0D0D0F] rounded-b-[var(--forge-radius-lg)]">
        <div className="flex">
          {/* Line numbers */}
          {showLineNumbers && (
            <div className="select-none py-5 pl-4 pr-3 text-right" aria-hidden>
              {lines.map((_, i) => (
                <div
                  key={i}
                  className="text-xs leading-6 text-[var(--forge-text-muted)] font-mono"
                >
                  {i + 1}
                </div>
              ))}
            </div>
          )}
          {/* Code */}
          <pre
            ref={preRef}
            className="flex-1 overflow-x-auto py-5 pr-12 pl-2 text-xs leading-6 font-mono text-[var(--forge-text-secondary)] whitespace-pre"
          />
        </div>
      </div>

      {/* Copy button */}
      <button
        id="code-block-copy"
        onClick={() => void copy(code)}
        aria-label="Copy code"
        className="absolute top-3 right-3 flex items-center gap-1.5 px-2 py-1 rounded-[var(--forge-radius-sm)] bg-[var(--forge-surface-2)] border border-[var(--forge-border)] text-[var(--forge-text-muted)] hover:text-[var(--forge-text-primary)] text-xs transition-all opacity-0 group-hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--forge-accent)]"
      >
        <AnimatePresence mode="wait" initial={false}>
          {copied ? (
            <motion.span
              key="check"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ duration: 0.12 }}
              className="flex items-center gap-1"
            >
              <Check size={11} className="text-[var(--forge-success)]" /> Copied
            </motion.span>
          ) : (
            <motion.span
              key="copy"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ duration: 0.12 }}
              className="flex items-center gap-1"
            >
              <Copy size={11} /> Copy
            </motion.span>
          )}
        </AnimatePresence>
      </button>
    </div>
  )
}
