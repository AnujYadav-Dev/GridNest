import { TextareaHTMLAttributes, ReactNode } from 'react'

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: ReactNode
  helperText?: ReactNode
  error?: ReactNode
}
