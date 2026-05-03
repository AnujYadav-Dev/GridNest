import { Metadata } from 'next'
import { Hero } from '@/components/docs/Hero'

export const metadata: Metadata = {
  title: 'Modern UI for Modern Developers',
  description: 'GridNest is a production-ready design system and component library built with Next.js 15, TypeScript, and Framer Motion.',
}

export default function DocsLandingPage() {
  return <Hero />
}
