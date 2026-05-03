import Link from 'next/link'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--forge-bg)]">
      {/* Minimal header */}
      <header className="px-6 py-4 border-b border-[var(--forge-border)]">
        <Link href="/" className="flex items-center gap-2 w-fit">
          <div className="flex h-7 w-7 items-center justify-center rounded-[var(--forge-radius-sm)] bg-[var(--forge-accent)] text-white text-xs font-bold font-mono">
            FG
          </div>
          <span className="font-sans font-semibold text-sm text-[var(--forge-text-primary)] tracking-tight">
            ForgeUI
          </span>
        </Link>
      </header>

      {/* Centered content */}
      <main className="flex flex-1 items-center justify-center px-4 py-12">
        {children}
      </main>

      {/* Background orb */}
      <div className="pointer-events-none fixed -top-32 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-[var(--forge-accent)] opacity-[0.04] blur-[100px]" />
    </div>
  )
}
