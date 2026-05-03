'use client'

import { forwardRef } from 'react'
import * as TogglePrimitive from '@radix-ui/react-toggle'
import { motion } from 'framer-motion'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { cva, type VariantProps } from 'class-variance-authority'
import { ToggleProps } from './Toggle.types'

const toggleVariants = cva(
  'inline-flex items-center justify-center rounded-[var(--forge-radius-md)] text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--forge-accent)] disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-[var(--forge-accent)] data-[state=on]:text-white',
  {
    variants: {
      variant: {
        default: 'bg-transparent hover:bg-[var(--forge-surface-2)] text-[var(--forge-text-primary)]',
        outline: 'border border-[var(--forge-border)] bg-transparent hover:bg-[var(--forge-surface-2)] text-[var(--forge-text-primary)]',
      },
      size: {
        sm: 'h-8 px-2',
        md: 'h-10 px-3',
        lg: 'h-12 px-4',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
)

const Toggle = forwardRef<React.ElementRef<typeof TogglePrimitive.Root>, ToggleProps & VariantProps<typeof toggleVariants>>(
  ({ className, variant, size, children, ...props }, ref) => {
    return (
      <TogglePrimitive.Root asChild ref={ref} {...props}>
        <motion.button
          className={twMerge(clsx(toggleVariants({ variant, size, className })))}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        >
          {children}
        </motion.button>
      </TogglePrimitive.Root>
    )
  }
)

Toggle.displayName = 'Toggle'
export default Toggle
