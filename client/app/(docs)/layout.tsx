'use client'

import { useState } from 'react'
import { Navbar } from '@/components/ui/Navbar'
import { Footer } from '@/components/ui/Footer'
import { Sidebar } from '@/components/docs/Sidebar'
import { SearchPalette } from '@/components/docs/SearchPalette'
import { AnimatedLayout } from '@/components/ui/AnimatedLayout'

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  const [query, setQuery] = useState('')

  return (
    <div className="flex flex-col min-h-screen bg-[var(--gridnest-bg)]">
      <Navbar />
      <SearchPalette query={query} setQuery={setQuery} />

      <div className="mx-auto flex w-full max-w-7xl flex-1 gap-6 px-4 pt-6 sm:px-6 lg:gap-8 lg:pt-8">
        <Sidebar />
        <main className="flex-1 min-w-0 pb-16">
          <AnimatedLayout>
            {children}
          </AnimatedLayout>
        </main>
      </div>

      <Footer />
    </div>
  )
}
