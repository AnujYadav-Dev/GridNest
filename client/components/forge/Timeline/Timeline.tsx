import { forwardRef } from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { TimelineProps } from './Timeline.types'

const Timeline = forwardRef<HTMLOListElement, TimelineProps>(
  ({ className, items, ...props }, ref) => (
    <ol ref={ref} className={twMerge(clsx('space-y-5', className))} {...props}>
      {items.map((item, index) => (
        <li key={index} className="relative pl-7">
          {index < items.length - 1 && <span className="absolute left-2 top-4 h-[calc(100%+1.25rem)] w-px bg-[var(--gridnest-border)]" />}
          <span className="absolute left-0 top-1 flex h-4 w-4 items-center justify-center rounded-full border border-[var(--gridnest-accent)] bg-[var(--gridnest-surface)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--gridnest-accent)]" />
          </span>
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <p className="text-sm font-medium text-[var(--gridnest-text-primary)]">{item.title}</p>
            {item.time && <time className="text-xs text-[var(--gridnest-text-muted)]">{item.time}</time>}
          </div>
          {item.description && <p className="mt-1 text-sm text-[var(--gridnest-text-secondary)]">{item.description}</p>}
        </li>
      ))}
    </ol>
  )
)

Timeline.displayName = 'Timeline'
export default Timeline
