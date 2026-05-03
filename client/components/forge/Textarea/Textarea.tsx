'use client'

import { forwardRef, useId } from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { TextareaProps } from './Textarea.types'

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, helperText, error, id, disabled, ...props }, ref) => {
    const generatedId = useId()
    const textareaId = id ?? generatedId
    const hasError = Boolean(error)

    return (
      <div className="flex w-full flex-col gap-1.5">
        {label && (
          <label htmlFor={textareaId} className={clsx('text-sm font-medium', hasError ? 'text-[var(--gridnest-danger)]' : 'text-[var(--gridnest-text-primary)]')}>
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          disabled={disabled}
          className={twMerge(
            clsx(
              'min-h-24 w-full resize-y rounded-[var(--gridnest-radius-md)] border bg-[var(--gridnest-surface-2)] px-3 py-2 text-sm text-[var(--gridnest-text-primary)] placeholder:text-[var(--gridnest-text-muted)] outline-none transition-colors',
              hasError ? 'border-[var(--gridnest-danger)] focus:ring-2 focus:ring-[var(--gridnest-danger)]/20' : 'border-[var(--gridnest-border)] hover:border-[var(--gridnest-border-hover)] focus:border-[var(--gridnest-accent)] focus:ring-2 focus:ring-[var(--gridnest-accent)]/20',
              disabled && 'cursor-not-allowed opacity-50',
              className
            )
          )}
          aria-invalid={hasError || undefined}
          {...props}
        />
        {(helperText || error) && (
          <p className={clsx('text-xs', hasError ? 'text-[var(--gridnest-danger)]' : 'text-[var(--gridnest-text-secondary)]')}>
            {error ?? helperText}
          </p>
        )}
      </div>
    )
  }
)

Textarea.displayName = 'Textarea'
export default Textarea
