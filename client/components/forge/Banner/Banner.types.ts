import { HTMLAttributes, ReactNode } from 'react'

export interface BannerProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  title: ReactNode
  description?: ReactNode
  action?: ReactNode
}
