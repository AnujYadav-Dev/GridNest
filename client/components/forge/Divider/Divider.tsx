import { forwardRef } from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { DividerProps } from './Divider.types'

const Divider = forwardRef<HTMLDivElement, DividerProps>(
  ({ className, orientation = 'horizontal', label, ...props }, ref) => {
    if (label && orientation === 'horizontal') {
      return (
        <div ref={ref} className={twMerge(clsx('flex w-full items-center gap-3', className))} {...props}>
          <span className="h-px flex-1 bg-[var(--gridnest-border)]" />
          <span className="text-xs text-[var(--gridnest-text-muted)]">{label}</span>
          <span className="h-px flex-1 bg-[var(--gridnest-border)]" />
        </div>
      )
    }

    return (
      <div
        ref={ref}
        role="separator"
        aria-orientation={orientation}
        className={twMerge(
          clsx(
            'shrink-0 bg-[var(--gridnest-border)]',
            orientation === 'horizontal' ? 'h-px w-full' : 'h-full w-px',
            className
          )
        )}
        {...props}
      />
    )
  }
)

Divider.displayName = 'Divider'
export default Divider
