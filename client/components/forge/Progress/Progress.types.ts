import { HTMLAttributes } from 'react'

export interface ProgressProps extends HTMLAttributes<HTMLDivElement> {
  value?: number // if undefined, it is indeterminate
  max?: number
  variant?: 'default' | 'success' | 'warning' | 'danger'
}
