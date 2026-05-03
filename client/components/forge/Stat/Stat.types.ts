import { HTMLAttributes, ReactNode } from 'react'

export interface StatProps extends HTMLAttributes<HTMLDivElement> {
  label: ReactNode
  value: ReactNode
  change?: ReactNode
  trend?: 'up' | 'down' | 'neutral'
}
