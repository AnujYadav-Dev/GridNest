import { forwardRef } from 'react'
import { Inbox } from 'lucide-react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { EmptyStateProps } from './EmptyState.types'

const EmptyState = forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ className, icon, title, description, action, ...props }, ref) => (
    <div
      ref={ref}
      className={twMerge(clsx('flex flex-col items-center justify-center rounded-[var(--gridnest-radius-lg)] border border-dashed border-[var(--gridnest-border)] bg-[var(--gridnest-surface)] px-6 py-10 text-center', className))}
      {...props}
    >
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--gridnest-surface-2)] text-[var(--gridnest-accent)]">
        {icon ?? <Inbox size={22} />}
      </div>
      <p className="font-sans text-sm font-semibold text-[var(--gridnest-text-primary)]">{title}</p>
      {description && <p className="mt-1 max-w-sm text-sm text-[var(--gridnest-text-secondary)]">{description}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  )
)

EmptyState.displayName = 'EmptyState'
export default EmptyState
