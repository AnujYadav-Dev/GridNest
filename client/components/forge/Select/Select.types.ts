import { SelectHTMLAttributes, ReactNode } from 'react'

export interface SelectOption {
  value: string
  label: ReactNode
  disabled?: boolean
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: ReactNode
  helperText?: ReactNode
  error?: ReactNode
  options: SelectOption[]
}
