import { ReactNode } from 'react'

export interface TooltipProps {
  content: ReactNode
  children: ReactNode
  delayDuration?: number
  side?: 'top' | 'right' | 'bottom' | 'left'
  align?: 'start' | 'center' | 'end'
  className?: string
}
