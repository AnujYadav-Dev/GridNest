import { InputHTMLAttributes, ReactNode } from 'react'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  helperText?: string
  error?: boolean | string
  iconLeft?: ReactNode
  iconRight?: ReactNode
}
