import { forwardRef } from 'react'
import { Loader2 } from 'lucide-react'
import { clsx } from 'clsx'
import { SpinnerProps } from './Spinner.types'

const sizeMap = { sm: 16, md: 24, lg: 36 }

const Spinner = forwardRef<HTMLDivElement, SpinnerProps>(
  ({ className, size = 'md', label = 'Loading', ...props }, ref) => (
    <div ref={ref} role="status" aria-label={label} className={clsx('inline-flex items-center gap-2 text-[var(--gridnest-text-secondary)]', className)} {...props}>
      <Loader2 size={sizeMap[size]} className="animate-spin text-[var(--gridnest-accent)]" />
      <span className="sr-only">{label}</span>
    </div>
  )
)

Spinner.displayName = 'Spinner'
export default Spinner
