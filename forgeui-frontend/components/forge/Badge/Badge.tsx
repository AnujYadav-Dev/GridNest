import { forwardRef } from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { cva, type VariantProps } from 'class-variance-authority'
import { BadgeProps } from './Badge.types'

const badgeVariants = cva(
  'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold font-body transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--gridnest-accent)] focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'bg-[var(--gridnest-surface-2)] text-[var(--gridnest-text-primary)] border border-[var(--gridnest-border)]',
        success: 'bg-[var(--gridnest-success)]/10 text-[var(--gridnest-success)] border border-[var(--gridnest-success)]/20',
        warning: 'bg-[var(--gridnest-warning)]/10 text-[var(--gridnest-warning)] border border-[var(--gridnest-warning)]/20',
        danger: 'bg-[var(--gridnest-danger)]/10 text-[var(--gridnest-danger)] border border-[var(--gridnest-danger)]/20',
      }
    },
    defaultVariants: {
      variant: 'default',
    }
  }
)

const Badge = forwardRef<HTMLSpanElement, BadgeProps & VariantProps<typeof badgeVariants>>(
  ({ className, variant, live, showDot, children, ...props }, ref) => {
    return (
      <span ref={ref} className={twMerge(clsx(badgeVariants({ variant }), className))} {...props}>
        {(live || showDot) && (
          <span className="relative flex h-2 w-2">
            {live && (
              <span className={clsx(
                "animate-pulse-ring absolute inline-flex h-full w-full rounded-full opacity-75",
                variant === 'default' ? 'bg-[var(--gridnest-text-primary)]' : 
                variant === 'success' ? 'bg-[var(--gridnest-success)]' :
                variant === 'warning' ? 'bg-[var(--gridnest-warning)]' : 'bg-[var(--gridnest-danger)]'
              )} />
            )}
            <span className={clsx(
              "relative inline-flex rounded-full h-2 w-2",
              variant === 'default' ? 'bg-[var(--gridnest-text-primary)]' : 
              variant === 'success' ? 'bg-[var(--gridnest-success)]' :
              variant === 'warning' ? 'bg-[var(--gridnest-warning)]' : 'bg-[var(--gridnest-danger)]'
            )} />
          </span>
        )}
        {children}
      </span>
    )
  }
)

Badge.displayName = 'Badge'
export default Badge
