import { forwardRef } from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { cva, type VariantProps } from 'class-variance-authority'
import { SkeletonProps } from './Skeleton.types'

const skeletonVariants = cva(
  'animate-shimmer bg-[var(--gridnest-surface-2)]',
  {
    variants: {
      variant: {
        text: 'h-4 w-full rounded-[var(--gridnest-radius-md)]',
        circle: 'h-10 w-10 rounded-full',
        rectangle: 'h-full w-full rounded-[var(--gridnest-radius-lg)]',
      }
    },
    defaultVariants: {
      variant: 'text'
    }
  }
)

const Skeleton = forwardRef<HTMLDivElement, SkeletonProps & VariantProps<typeof skeletonVariants>>(
  ({ className, variant, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={twMerge(clsx(skeletonVariants({ variant }), className))}
        {...props}
      />
    )
  }
)

Skeleton.displayName = 'Skeleton'
export default Skeleton
