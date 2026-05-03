'use client'

import { forwardRef, useId } from 'react'
import { Check } from 'lucide-react'
import { clsx } from 'clsx'
import { CheckboxProps } from './Checkbox.types'

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, description, id, disabled, ...props }, ref) => {
    const generatedId = useId()
    const inputId = id ?? generatedId

    return (
      <label
        htmlFor={inputId}
        className={clsx(
          'group flex cursor-pointer items-start gap-3 text-sm text-[var(--gridnest-text-primary)]',
          disabled && 'cursor-not-allowed opacity-50',
          className
        )}
      >
        <span className="relative mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center">
          <input
            ref={ref}
            id={inputId}
            type="checkbox"
            disabled={disabled}
            className="peer h-5 w-5 appearance-none rounded-[var(--gridnest-radius-sm)] border border-[var(--gridnest-border)] bg-[var(--gridnest-surface-2)] transition-colors checked:border-[var(--gridnest-accent)] checked:bg-[var(--gridnest-accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gridnest-accent)] focus-visible:ring-offset-2"
            {...props}
          />
          <Check size={14} className="pointer-events-none absolute text-white opacity-0 transition-opacity peer-checked:opacity-100" />
        </span>
        {(label || description) && (
          <span className="min-w-0">
            {label && <span className="block font-medium">{label}</span>}
            {description && <span className="mt-0.5 block text-xs text-[var(--gridnest-text-secondary)]">{description}</span>}
          </span>
        )}
      </label>
    )
  }
)

Checkbox.displayName = 'Checkbox'
export default Checkbox
