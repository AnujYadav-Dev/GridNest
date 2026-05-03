import { forwardRef } from 'react'
import { ChevronRight } from 'lucide-react'
import { BreadcrumbProps } from './Breadcrumb.types'

const Breadcrumb = forwardRef<HTMLElement, BreadcrumbProps>(
  ({ items, ...props }, ref) => (
    <nav ref={ref} aria-label="Breadcrumb" {...props}>
      <ol className="flex flex-wrap items-center gap-1 text-sm text-[var(--gridnest-text-secondary)]">
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          return (
            <li key={index} className="flex items-center gap-1">
              {item.href && !isLast ? (
                <a href={item.href} className="rounded-[var(--gridnest-radius-sm)] px-1.5 py-1 transition-colors hover:bg-[var(--gridnest-surface-2)] hover:text-[var(--gridnest-text-primary)]">
                  {item.label}
                </a>
              ) : (
                <span className="px-1.5 py-1 text-[var(--gridnest-text-primary)]" aria-current={isLast ? 'page' : undefined}>
                  {item.label}
                </span>
              )}
              {!isLast && <ChevronRight size={14} className="text-[var(--gridnest-text-muted)]" />}
            </li>
          )
        })}
      </ol>
    </nav>
  )
)

Breadcrumb.displayName = 'Breadcrumb'
export default Breadcrumb
