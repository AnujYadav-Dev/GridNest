import { forwardRef } from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { ToolbarProps } from './Toolbar.types'

const Toolbar = forwardRef<HTMLDivElement, ToolbarProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      role="toolbar"
      className={twMerge(clsx('flex flex-wrap items-center gap-1 rounded-[var(--gridnest-radius-lg)] border border-[var(--gridnest-border)] bg-[var(--gridnest-surface)] p-1', className))}
      {...props}
    />
  )
)

Toolbar.displayName = 'Toolbar'
export default Toolbar
