'use client'

import { forwardRef, useState } from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { cva, type VariantProps } from 'class-variance-authority'
import { AvatarProps } from './Avatar.types'

const avatarVariants = cva(
  'relative inline-flex items-center justify-center rounded-full bg-[var(--forge-surface-2)] text-[var(--forge-text-primary)] font-body font-medium select-none overflow-hidden ring-1 ring-[var(--forge-border)]',
  {
    variants: {
      size: {
        sm: 'h-8 w-8 text-xs',
        md: 'h-10 w-10 text-sm',
        lg: 'h-12 w-12 text-base',
        xl: 'h-16 w-16 text-lg',
      }
    },
    defaultVariants: { size: 'md' }
  }
)

const Avatar = forwardRef<HTMLDivElement, AvatarProps & VariantProps<typeof avatarVariants>>(
  ({ className, size, src, alt, initials, status, ...props }, ref) => {
    const [imgError, setImgError] = useState(false)

    const showFallback = !src || imgError

    return (
      <div className="relative inline-block">
        <div ref={ref} className={twMerge(clsx(avatarVariants({ size }), className))} {...props}>
          {!showFallback ? (
            <img
              src={src}
              alt={alt || initials || 'Avatar'}
              className="h-full w-full object-cover rounded-full"
              onError={() => setImgError(true)}
            />
          ) : (
            <span>{initials?.slice(0, 2).toUpperCase() || '?'}</span>
          )}
        </div>
        
        {status && (
          <span
            className={clsx(
              "absolute bottom-0 right-0 block rounded-full ring-2 ring-[var(--forge-bg)]",
              size === 'sm' ? 'h-2 w-2' : size === 'md' ? 'h-2.5 w-2.5' : size === 'lg' ? 'h-3 w-3' : 'h-4 w-4',
              status === 'online' ? 'bg-[var(--forge-success)]' :
              status === 'busy' ? 'bg-[var(--forge-danger)]' :
              status === 'away' ? 'bg-[var(--forge-warning)]' : 'bg-[var(--forge-text-muted)]'
            )}
          />
        )}
      </div>
    )
  }
)

Avatar.displayName = 'Avatar'
export default Avatar
