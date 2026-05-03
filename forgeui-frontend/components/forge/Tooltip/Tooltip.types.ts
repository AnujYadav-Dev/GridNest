import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import { ReactNode } from 'react'

export interface TooltipProps extends React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content> {
  content: ReactNode
  children: ReactNode
  delayDuration?: number
  side?: 'top' | 'right' | 'bottom' | 'left'
  align?: 'start' | 'center' | 'end'
}
