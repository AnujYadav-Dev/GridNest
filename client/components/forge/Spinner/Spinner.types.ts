import { HTMLAttributes } from 'react'

export interface SpinnerProps extends HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg'
  label?: string
}
