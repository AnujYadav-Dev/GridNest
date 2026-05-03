import { Metadata } from 'next'
import { ComponentGrid } from '@/components/docs/ComponentGrid'
import { componentList } from '@/lib/componentCatalog'

export const metadata: Metadata = {
  title: 'Components',
  description: `Browse all ${componentList.length} production-grade components in the GridNest library. Filter by category or search with Cmd+K.`,
}

export default function ComponentsOverviewPage() {
  return <ComponentGrid />
}
