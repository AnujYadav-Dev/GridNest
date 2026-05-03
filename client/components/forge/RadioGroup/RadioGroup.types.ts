import { HTMLAttributes, ReactNode } from 'react'

export interface RadioOption {
  value: string
  label: ReactNode
  description?: ReactNode
  disabled?: boolean
}

export interface RadioGroupProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  name: string
  options: RadioOption[]
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
}
