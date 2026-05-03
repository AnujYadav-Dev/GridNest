'use client'

import { forwardRef } from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { motion } from 'framer-motion'
import { ProgressProps } from './Progress.types'

const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value, max = 100, variant = 'default', ...props }, ref) => {
    const isIndeterminate = value === undefined
    const percentage = isIndeterminate ? 0 : Math.min(100, Math.max(0, (value / max) * 100))

    return (
      <div
        ref={ref}
        className={twMerge(clsx('relative h-2 w-full overflow-hidden rounded-full bg-[var(--gridnest-surface-2)]', className))}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={isIndeterminate ? undefined : value}
        {...props}
      >
        {isIndeterminate ? (
          <motion.div
            className={clsx(
              'h-full w-full rounded-full opacity-70',
              variant === 'default' ? 'bg-[var(--gridnest-accent)]' :
              variant === 'success' ? 'bg-[var(--gridnest-success)]' :
              variant === 'warning' ? 'bg-[var(--gridnest-warning)]' : 'bg-[var(--gridnest-danger)]'
            )}
            animate={{
              x: ['-100%', '100%'],
            }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
              ease: "linear"
            }}
          />
        ) : (
          <motion.div
            className={clsx(
              'h-full rounded-full transition-colors duration-300',
              variant === 'default' ? 'bg-[var(--gridnest-accent)]' :
              variant === 'success' ? 'bg-[var(--gridnest-success)]' :
              variant === 'warning' ? 'bg-[var(--gridnest-warning)]' : 'bg-[var(--gridnest-danger)]'
            )}
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          />
        )}
      </div>
    )
  }
)

Progress.displayName = 'Progress'
export default Progress
