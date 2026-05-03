'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronRight } from 'lucide-react'

const categories = [
  {
    label: 'Getting Started',
    items: [
      { href: '/', label: 'Introduction' },
      { href: '/tokens', label: 'Design Tokens' },
      { href: '/motion', label: 'Motion Guide' },
    ],
  },
  {
    label: 'Form',
    items: [
      { href: '/components/button', label: 'Button' },
      { href: '/components/input', label: 'Input' },
      { href: '/components/toggle', label: 'Toggle' },
    ],
  },
  {
    label: 'Display',
    items: [
      { href: '/components/badge', label: 'Badge' },
      { href: '/components/avatar', label: 'Avatar' },
      { href: '/components/card', label: 'Card' },
      { href: '/components/skeleton', label: 'Skeleton' },
      { href: '/components/progress', label: 'Progress' },
    ],
  },
  {
    label: 'Feedback',
    items: [
      { href: '/components/toast', label: 'Toast', isNew: true },
      { href: '/components/modal', label: 'Modal' },
      { href: '/components/tooltip', label: 'Tooltip' },
    ],
  },
  {
    label: 'Navigation',
    items: [
      { href: '/components/tabs', label: 'Tabs' },
      { href: '/components/accordion', label: 'Accordion' },
      { href: '/components/dropdown', label: 'Dropdown' },
    ],
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-56 shrink-0 hidden lg:block">
      <div className="sticky top-20 overflow-y-auto max-h-[calc(100vh-5rem)] pr-4 pb-8">
        {categories.map((cat) => (
          <div key={cat.label} className="mb-6">
            <p className="mb-1.5 px-2 text-[10px] font-semibold uppercase tracking-widest text-[var(--gridnest-text-muted)]">
              {cat.label}
            </p>
            <ul className="space-y-0.5">
              {cat.items.map((item) => {
                const isActive = pathname === item.href
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`flex items-center justify-between px-2 py-1.5 rounded-[var(--gridnest-radius-md)] text-sm transition-colors ${
                        isActive
                          ? 'bg-[var(--gridnest-accent-subtle)] text-[var(--gridnest-accent)] font-medium'
                          : 'text-[var(--gridnest-text-secondary)] hover:text-[var(--gridnest-text-primary)] hover:bg-[var(--gridnest-surface-2)]'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        {item.label}
                        {'isNew' in item && item.isNew && (
                          <span className="text-[9px] font-bold uppercase tracking-wider px-1 py-0.5 rounded bg-[var(--gridnest-accent)] text-white leading-none">
                            New
                          </span>
                        )}
                      </span>
                      {isActive && <ChevronRight size={12} className="text-[var(--gridnest-accent)]" />}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </div>
    </aside>
  )
}
