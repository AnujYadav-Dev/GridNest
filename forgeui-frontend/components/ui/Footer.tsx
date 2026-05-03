'use client'

import Link from 'next/link'

function GithubIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.73.083-.73 1.205.085 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.605-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.298 24 12c0-6.627-5.373-12-12-12" />
    </svg>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-[var(--forge-border)] bg-[var(--forge-bg)] mt-auto">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-[var(--forge-radius-sm)] bg-[var(--forge-accent)] text-white text-[10px] font-bold font-mono">
            FG
          </div>
          <span className="text-sm font-sans font-semibold text-[var(--forge-text-primary)]">ForgeUI</span>
          <span className="text-xs text-[var(--forge-text-muted)] ml-2">MIT License</span>
        </div>

        <p className="text-xs text-[var(--forge-text-muted)] text-center">
          Editorial precision meets developer utility - 14 production-grade components.
        </p>

        <div className="flex items-center gap-4">
          <Link href="/components" className="text-xs text-[var(--forge-text-secondary)] hover:text-[var(--forge-text-primary)] transition-colors">
            Components
          </Link>
          <Link href="/tokens" className="text-xs text-[var(--forge-text-secondary)] hover:text-[var(--forge-text-primary)] transition-colors">
            Tokens
          </Link>
          <Link href="/motion" className="text-xs text-[var(--forge-text-secondary)] hover:text-[var(--forge-text-primary)] transition-colors">
            Motion
          </Link>
          <a
            href="https://github.com/AnujYadav-Dev/forgeui"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--forge-text-secondary)] hover:text-[var(--forge-text-primary)] transition-colors"
          >
            <GithubIcon size={14} />
          </a>
        </div>
      </div>
    </footer>
  )
}
