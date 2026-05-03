'use client'

import { motion } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from '@/hooks/useTheme'

export function ThemeSwitcher() {
  const { isDark, toggleTheme, mounted } = useTheme()

  if (!mounted) {
    return <div className="h-8 w-8 rounded-[var(--gridnest-radius-md)] bg-[var(--gridnest-surface-2)]" />
  }

  return (
    <button
      id="theme-switcher"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      className="flex items-center justify-center h-8 w-8 rounded-[var(--gridnest-radius-md)] text-[var(--gridnest-text-secondary)] hover:text-[var(--gridnest-text-primary)] hover:bg-[var(--gridnest-surface-2)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gridnest-accent)]"
    >
      <motion.div
        key={isDark ? 'moon' : 'sun'}
        initial={{ rotate: -90, opacity: 0, scale: 0.8 }}
        animate={{ rotate: 0, opacity: 1, scale: 1 }}
        exit={{ rotate: 90, opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      >
        {isDark ? <Sun size={16} /> : <Moon size={16} />}
      </motion.div>
    </button>
  )
}
