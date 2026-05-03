'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronRight } from 'lucide-react'
import { sidebarCategories } from '@/lib/componentCatalog'

const categories = [
  {
    label: 'Getting Started',
    items: [
      { href: '/', label: 'Introduction' },
      { href: '/tokens', label: 'Design Tokens' },
      { href: '/motion', label: 'Motion Guide' },
    ],
  },
  ...sidebarCategories.map((group) => ({
    label: group.label,
    items: group.items.map((item) => ({
      href: `/components/${item.slug}`,
      label: item.name,
      isNew: item.isNew,
    })),
  })),
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
