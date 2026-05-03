import { Metadata } from 'next'
import { ComponentGrid } from '@/components/docs/ComponentGrid'

export const metadata: Metadata = {
  title: 'Components',
  description: 'Browse all 14 production-grade components in the ForgeUI library. Filter by category or search with Cmd+K.',
}

export default function ComponentsOverviewPage() {
  return <ComponentGrid />
}
