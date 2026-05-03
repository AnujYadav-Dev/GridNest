import { forwardRef } from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { KbdProps } from './Kbd.types'

const Kbd = forwardRef<HTMLElement, KbdProps>(
  ({ className, size = 'md', ...props }, ref) => (
    <kbd
      ref={ref}
      className={twMerge(
        clsx(
          'inline-flex items-center justify-center rounded-[var(--gridnest-radius-sm)] border border-[var(--gridnest-border)] bg-[var(--gridnest-surface-2)] font-mono font-medium text-[var(--gridnest-text-secondary)] shadow-[inset_0_-1px_0_var(--gridnest-border)]',
          size === 'sm' ? 'h-5 min-w-5 px-1 text-[10px]' : 'h-6 min-w-6 px-1.5 text-xs',
          className
        )
      )}
      {...props}
    />
  )
)

Kbd.displayName = 'Kbd'
export default Kbd
