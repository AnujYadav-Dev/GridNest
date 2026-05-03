'use client'

import { forwardRef, useId } from 'react'
import { ChevronDown } from 'lucide-react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { SelectProps } from './Select.types'

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, helperText, error, options, id, disabled, ...props }, ref) => {
    const generatedId = useId()
    const selectId = id ?? generatedId
    const hasError = Boolean(error)

    return (
      <div className="flex w-full flex-col gap-1.5">
        {label && (
          <label htmlFor={selectId} className={clsx('text-sm font-medium', hasError ? 'text-[var(--gridnest-danger)]' : 'text-[var(--gridnest-text-primary)]')}>
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            disabled={disabled}
            className={twMerge(
              clsx(
                'h-10 w-full appearance-none rounded-[var(--gridnest-radius-md)] border bg-[var(--gridnest-surface-2)] px-3 pr-9 text-sm text-[var(--gridnest-text-primary)] outline-none transition-colors',
                hasError ? 'border-[var(--gridnest-danger)] focus:ring-2 focus:ring-[var(--gridnest-danger)]/20' : 'border-[var(--gridnest-border)] hover:border-[var(--gridnest-border-hover)] focus:border-[var(--gridnest-accent)] focus:ring-2 focus:ring-[var(--gridnest-accent)]/20',
                disabled && 'cursor-not-allowed opacity-50',
                className
              )
            )}
            aria-invalid={hasError || undefined}
            {...props}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value} disabled={option.disabled}>
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown size={16} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[var(--gridnest-text-muted)]" />
        </div>
        {(helperText || error) && (
          <p className={clsx('text-xs', hasError ? 'text-[var(--gridnest-danger)]' : 'text-[var(--gridnest-text-secondary)]')}>
            {error ?? helperText}
          </p>
        )}
      </div>
    )
  }
)

Select.displayName = 'Select'
export default Select
