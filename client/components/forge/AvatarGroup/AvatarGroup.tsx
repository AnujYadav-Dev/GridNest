import { forwardRef } from 'react'
import { clsx } from 'clsx'
import { AvatarGroupProps } from './AvatarGroup.types'

const AvatarGroup = forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ className, items, max = 4, ...props }, ref) => {
    const visible = items.slice(0, max)
    const overflow = Math.max(0, items.length - visible.length)

    return (
      <div ref={ref} className={clsx('flex -space-x-2', className)} {...props}>
        {visible.map((item, index) => (
          <div
            key={`${item.initials}-${index}`}
            title={item.label}
            className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[var(--gridnest-bg)] bg-[var(--gridnest-surface-2)] text-xs font-semibold text-[var(--gridnest-text-primary)]"
          >
            {item.initials.slice(0, 2).toUpperCase()}
          </div>
        ))}
        {overflow > 0 && (
          <div className="flex h-9 min-w-9 items-center justify-center rounded-full border-2 border-[var(--gridnest-bg)] bg-[var(--gridnest-accent)] px-2 text-xs font-semibold text-white">
            +{overflow}
          </div>
        )}
      </div>
    )
  }
)

AvatarGroup.displayName = 'AvatarGroup'
export default AvatarGroup
