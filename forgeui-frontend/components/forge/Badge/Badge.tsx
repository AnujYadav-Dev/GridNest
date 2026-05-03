import { forwardRef } from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { cva, type VariantProps } from 'class-variance-authority'
import { BadgeProps } from './Badge.types'

const badgeVariants = cva(
  'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold font-body transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--forge-accent)] focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'bg-[var(--forge-surface-2)] text-[var(--forge-text-primary)] border border-[var(--forge-border)]',
        success: 'bg-[var(--forge-success)]/10 text-[var(--forge-success)] border border-[var(--forge-success)]/20',
        warning: 'bg-[var(--forge-warning)]/10 text-[var(--forge-warning)] border border-[var(--forge-warning)]/20',
        danger: 'bg-[var(--forge-danger)]/10 text-[var(--forge-danger)] border border-[var(--forge-danger)]/20',
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
                variant === 'default' ? 'bg-[var(--forge-text-primary)]' : 
                variant === 'success' ? 'bg-[var(--forge-success)]' :
                variant === 'warning' ? 'bg-[var(--forge-warning)]' : 'bg-[var(--forge-danger)]'
              )} />
            )}
            <span className={clsx(
              "relative inline-flex rounded-full h-2 w-2",
              variant === 'default' ? 'bg-[var(--forge-text-primary)]' : 
              variant === 'success' ? 'bg-[var(--forge-success)]' :
              variant === 'warning' ? 'bg-[var(--forge-warning)]' : 'bg-[var(--forge-danger)]'
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
