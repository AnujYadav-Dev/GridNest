import { HTMLAttributes } from 'react'

export interface StepperProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value?: number
  defaultValue?: number
  min?: number
  max?: number
  step?: number
  onValueChange?: (value: number) => void
}
