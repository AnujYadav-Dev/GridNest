import { forwardRef } from 'react'
import { Sparkles } from 'lucide-react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { BannerProps } from './Banner.types'

const Banner = forwardRef<HTMLDivElement, BannerProps>(
  ({ className, title, description, action, ...props }, ref) => (
    <div ref={ref} className={twMerge(clsx('flex flex-col gap-4 rounded-[var(--gridnest-radius-lg)] border border-[var(--gridnest-accent)]/30 bg-[var(--gridnest-accent)]/10 p-5 sm:flex-row sm:items-center sm:justify-between', className))} {...props}>
      <div className="flex items-start gap-3">
        <Sparkles size={18} className="mt-0.5 shrink-0 text-[var(--gridnest-accent)]" />
        <div>
          <p className="text-sm font-semibold text-[var(--gridnest-text-primary)]">{title}</p>
          {description && <p className="mt-1 text-sm text-[var(--gridnest-text-secondary)]">{description}</p>}
        </div>
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  )
)

Banner.displayName = 'Banner'
export default Banner
