'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { ThemeSwitcher } from '@/components/docs/ThemeSwitcher'

function GithubIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.73.083-.73 1.205.085 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.605-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.298 24 12c0-6.627-5.373-12-12-12" />
    </svg>
  )
}

const navLinks = [
  { href: '/components', label: 'Components' },
  { href: '/tokens', label: 'Tokens' },
  { href: '/motion', label: 'Motion' },
]

export function Navbar() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--forge-border)] bg-[var(--forge-bg)]/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <motion.div
            className="flex h-7 w-7 items-center justify-center rounded-[var(--forge-radius-sm)] bg-[var(--forge-accent)] text-white text-xs font-bold font-mono"
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
          >
            FG
          </motion.div>
          <span className="font-sans font-semibold text-[var(--forge-text-primary)] text-sm tracking-tight">
            ForgeUI
          </span>
        </Link>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = pathname.startsWith(link.href)
            return (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-3 py-1.5 text-sm rounded-[var(--forge-radius-md)] transition-colors duration-150
                  text-[var(--forge-text-secondary)] hover:text-[var(--forge-text-primary)] hover:bg-[var(--forge-surface-2)]"
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-[var(--forge-radius-md)] bg-[var(--forge-surface-2)]"
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  />
                )}
                <span className={`relative z-10 ${isActive ? 'text-[var(--forge-text-primary)]' : ''}`}>
                  {link.label}
                </span>
              </Link>
            )
          })}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <a
            href="https://github.com/AnujYadav-Dev/forgeui"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center h-8 w-8 rounded-[var(--forge-radius-md)] text-[var(--forge-text-secondary)] hover:text-[var(--forge-text-primary)] hover:bg-[var(--forge-surface-2)] transition-colors"
          >
          <GithubIcon size={16} />
          </a>
          <ThemeSwitcher />
          <Link
            href="/login"
            className="hidden md:flex h-8 items-center px-3 text-sm rounded-[var(--forge-radius-md)] border border-[var(--forge-border)] text-[var(--forge-text-secondary)] hover:text-[var(--forge-text-primary)] hover:border-[var(--forge-border-hover)] transition-colors"
          >
            Sign in
          </Link>
        </div>
      </div>
    </header>
  )
}
