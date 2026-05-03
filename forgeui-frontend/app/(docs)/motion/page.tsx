import { Metadata } from 'next'
import MotionPage from '@/components/docs/MotionGuide'

export const metadata: Metadata = {
  title: 'Motion Guide',
  description: 'Understand the motion philosophy behind ForgeUI. Explore easing curves, shared variants, and best practices for interface animations.',
}

export default function MotionOverviewPage() {
  return <MotionPage />
}
