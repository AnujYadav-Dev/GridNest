'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { LayoutDashboard, Bookmark, Palette, LogOut } from 'lucide-react'
import { clearTokens } from '@/lib/auth'

const navItems = [
  { href: '/dashboard', label: 'Overview', icon: LayoutDashboard },
  { href: '/dashboard/saved', label: 'Saved', icon: Bookmark },
  { href: '/dashboard/themes', label: 'Themes', icon: Palette },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()

  function handleLogout() {
    clearTokens()
    document.cookie = 'forge_access=; path=/; max-age=0'
    router.push('/login')
  }

  return (
    <div className="min-h-screen flex bg-[var(--gridnest-bg)]">
      {/* Sidebar */}
      <aside className="w-56 shrink-0 border-r border-[var(--gridnest-border)] flex flex-col">
        {/* Logo */}
        <div className="flex items-center gap-2 px-5 py-4 border-b border-[var(--gridnest-border)]">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-[var(--gridnest-radius-sm)] bg-[var(--gridnest-accent)] text-white text-xs font-bold font-mono">
              FG
            </div>
            <span className="font-sans font-semibold text-sm text-[var(--gridnest-text-primary)]">GridNest</span>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                id={`dash-nav-${item.label.toLowerCase()}`}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-[var(--gridnest-radius-md)] text-sm transition-colors ${
                  isActive
                    ? 'bg-[var(--gridnest-accent-subtle)] text-[var(--gridnest-accent)] font-medium'
                    : 'text-[var(--gridnest-text-secondary)] hover:text-[var(--gridnest-text-primary)] hover:bg-[var(--gridnest-surface-2)]'
                }`}
              >
                <Icon size={15} />
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* Logout */}
        <div className="px-3 py-4 border-t border-[var(--gridnest-border)]">
          <button
            id="dashboard-logout"
            onClick={handleLogout}
            className="flex w-full items-center gap-2.5 px-3 py-2 rounded-[var(--gridnest-radius-md)] text-sm text-[var(--gridnest-text-secondary)] hover:text-[var(--gridnest-danger)] hover:bg-[var(--gridnest-danger)]/10 transition-colors"
          >
            <LogOut size={15} />
            Sign out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 min-w-0 p-8">
        {children}
      </main>
    </div>
  )
}
