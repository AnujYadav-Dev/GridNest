import { HTMLAttributes, ReactNode } from 'react'

export interface ToastProps extends HTMLAttributes<HTMLDivElement> {
  id?: string
  title?: string
  description?: ReactNode
  variant?: 'default' | 'success' | 'warning' | 'danger'
  duration?: number
  onClose?: () => void
}
