'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { fadeUp } from '@/lib/motion'

interface AnimatedLayoutProps {
  children: React.ReactNode
}

export function AnimatedLayout({ children }: AnimatedLayoutProps) {
  const pathname = usePathname()

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="flex flex-col flex-1"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
