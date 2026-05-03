import { Metadata } from 'next'
import TokensPage from '@/components/docs/TokenExplorer'

export const metadata: Metadata = {
  title: 'Token Explorer',
  description: 'Explore the design tokens that power ForgeUI. Click to copy CSS variables for colors, typography, spacing, and more.',
}

export default function TokensOverviewPage() {
  return <TokensPage />
}
