'use client'

import { forwardRef } from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { cva, type VariantProps } from 'class-variance-authority'
import { CardProps } from './Card.types'
import { motion } from 'framer-motion'

const cardVariants = cva(
  'rounded-[var(--gridnest-radius-xl)] bg-[var(--gridnest-surface)] text-[var(--gridnest-text-primary)] overflow-hidden transition-all duration-300',
  {
    variants: {
      variant: {
        default: '',
        elevated: 'shadow-[var(--gridnest-shadow-md)]',
        bordered: 'border border-[var(--gridnest-border)]',
      },
      interactive: {
        true: 'cursor-pointer hover:border-[var(--gridnest-accent)] hover:shadow-[var(--gridnest-shadow-md)] hover:-translate-y-1',
        false: '',
      }
    },
    defaultVariants: {
      variant: 'default',
      interactive: false,
    }
  }
)

const Card = forwardRef<HTMLDivElement, CardProps & VariantProps<typeof cardVariants>>(
  ({ className, variant, interactive, children, ...props }, ref) => {
    
    // If interactive is true, we render a motion.div for smoother tap animations
    if (interactive) {
      return (
        <motion.div
          ref={ref}
          className={twMerge(clsx(cardVariants({ variant, interactive }), className))}
          whileTap={{ scale: 0.98 }}
          {...props as any}
        >
          {children}
        </motion.div>
      )
    }

    return (
      <div
        ref={ref}
        className={twMerge(clsx(cardVariants({ variant, interactive }), className))}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Card.displayName = 'Card'

export const CardHeader = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={twMerge(clsx("flex flex-col space-y-1.5 p-6", className))} {...props} />
  )
)
CardHeader.displayName = 'CardHeader'

export const CardTitle = forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3 ref={ref} className={twMerge(clsx("text-lg font-semibold leading-none tracking-tight font-sans text-[var(--gridnest-text-primary)]", className))} {...props} />
  )
)
CardTitle.displayName = 'CardTitle'

export const CardDescription = forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={twMerge(clsx("text-sm text-[var(--gridnest-text-secondary)] font-body", className))} {...props} />
  )
)
CardDescription.displayName = 'CardDescription'

export const CardContent = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={twMerge(clsx("p-6 pt-0", className))} {...props} />
  )
)
CardContent.displayName = 'CardContent'

export const CardFooter = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={twMerge(clsx("flex items-center p-6 pt-0", className))} {...props} />
  )
)
CardFooter.displayName = 'CardFooter'

export default Card
