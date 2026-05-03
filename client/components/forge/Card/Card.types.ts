import { HTMLAttributes } from 'react'
import { VariantProps } from 'class-variance-authority'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'bordered'
  interactive?: boolean
}
