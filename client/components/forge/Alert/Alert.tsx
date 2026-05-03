'use client'

import { forwardRef } from 'react'
import { AlertCircle, CheckCircle2, Info, TriangleAlert } from 'lucide-react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { AlertProps } from './Alert.types'

const iconMap = {
  info: Info,
  success: CheckCircle2,
  warning: TriangleAlert,
  danger: AlertCircle,
}

const Alert = forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = 'info', title, icon, children, ...props }, ref) => {
    const Icon = iconMap[variant]

    return (
      <div
        ref={ref}
        role="status"
        className={twMerge(
          clsx(
            'flex gap-3 rounded-[var(--gridnest-radius-lg)] border p-4 text-sm',
            variant === 'info' && 'border-[var(--gridnest-accent)]/30 bg-[var(--gridnest-accent)]/10 text-[var(--gridnest-text-primary)]',
            variant === 'success' && 'border-[var(--gridnest-success)]/30 bg-[var(--gridnest-success)]/10 text-[var(--gridnest-success)]',
            variant === 'warning' && 'border-[var(--gridnest-warning)]/30 bg-[var(--gridnest-warning)]/10 text-[var(--gridnest-warning)]',
            variant === 'danger' && 'border-[var(--gridnest-danger)]/30 bg-[var(--gridnest-danger)]/10 text-[var(--gridnest-danger)]',
            className
          )
        )}
        {...props}
      >
        <span className="mt-0.5 shrink-0">
          {icon ?? <Icon size={18} />}
        </span>
        <div className="min-w-0">
          {title && <p className="font-semibold text-[var(--gridnest-text-primary)]">{title}</p>}
          {children && <div className="mt-1 text-[var(--gridnest-text-secondary)]">{children}</div>}
        </div>
      </div>
    )
  }
)

Alert.displayName = 'Alert'
export default Alert
