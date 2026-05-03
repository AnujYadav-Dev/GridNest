import { AnchorHTMLAttributes, ReactNode } from 'react'

export interface BreadcrumbItem {
  label: ReactNode
  href?: string
}

export interface BreadcrumbProps extends AnchorHTMLAttributes<HTMLElement> {
  items: BreadcrumbItem[]
}
