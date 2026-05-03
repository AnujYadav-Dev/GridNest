import { forwardRef } from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { StatProps } from './Stat.types'

const Stat = forwardRef<HTMLDivElement, StatProps>(
  ({ className, label, value, change, trend = 'neutral', ...props }, ref) => (
    <div ref={ref} className={twMerge(clsx('rounded-[var(--gridnest-radius-lg)] border border-[var(--gridnest-border)] bg-[var(--gridnest-surface)] p-5', className))} {...props}>
      <p className="text-xs font-medium uppercase tracking-wider text-[var(--gridnest-text-muted)]">{label}</p>
      <p className="mt-2 font-sans text-2xl font-bold text-[var(--gridnest-text-primary)]">{value}</p>
      {change && (
        <p
          className={clsx(
            'mt-2 text-xs font-medium',
            trend === 'up' && 'text-[var(--gridnest-success)]',
            trend === 'down' && 'text-[var(--gridnest-danger)]',
            trend === 'neutral' && 'text-[var(--gridnest-text-secondary)]'
          )}
        >
          {change}
        </p>
      )}
    </div>
  )
)

Stat.displayName = 'Stat'
export default Stat
