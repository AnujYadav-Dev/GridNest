import { HTMLAttributes, ReactNode } from 'react'

export interface TimelineItem {
  title: ReactNode
  description?: ReactNode
  time?: ReactNode
}

export interface TimelineProps extends HTMLAttributes<HTMLOListElement> {
  items: TimelineItem[]
}
