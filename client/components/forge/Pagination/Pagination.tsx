'use client'

import { forwardRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { clsx } from 'clsx'
import { PaginationProps } from './Pagination.types'

const Pagination = forwardRef<HTMLDivElement, PaginationProps>(
  ({ className, page, totalPages, onPageChange, ...props }, ref) => {
    const pages = Array.from({ length: totalPages }, (_, index) => index + 1)

    return (
      <nav ref={ref} className={clsx('flex items-center gap-1', className)} aria-label="Pagination" {...props}>
        <button type="button" onClick={() => onPageChange?.(page - 1)} disabled={page <= 1} className="flex h-9 w-9 items-center justify-center rounded-[var(--gridnest-radius-md)] border border-[var(--gridnest-border)] text-[var(--gridnest-text-secondary)] transition-colors hover:bg-[var(--gridnest-surface-2)] disabled:pointer-events-none disabled:opacity-40">
          <ChevronLeft size={16} />
        </button>
        {pages.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => onPageChange?.(item)}
            aria-current={item === page ? 'page' : undefined}
            className={clsx(
              'h-9 min-w-9 rounded-[var(--gridnest-radius-md)] border px-3 text-sm transition-colors',
              item === page
                ? 'border-[var(--gridnest-accent)] bg-[var(--gridnest-accent)] text-white'
                : 'border-[var(--gridnest-border)] text-[var(--gridnest-text-secondary)] hover:bg-[var(--gridnest-surface-2)] hover:text-[var(--gridnest-text-primary)]'
            )}
          >
            {item}
          </button>
        ))}
        <button type="button" onClick={() => onPageChange?.(page + 1)} disabled={page >= totalPages} className="flex h-9 w-9 items-center justify-center rounded-[var(--gridnest-radius-md)] border border-[var(--gridnest-border)] text-[var(--gridnest-text-secondary)] transition-colors hover:bg-[var(--gridnest-surface-2)] disabled:pointer-events-none disabled:opacity-40">
          <ChevronRight size={16} />
        </button>
      </nav>
    )
  }
)

Pagination.displayName = 'Pagination'
export default Pagination
