import { InputHTMLAttributes, ReactNode } from 'react'

export interface RangeSliderProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: ReactNode
  valueLabel?: ReactNode
}
