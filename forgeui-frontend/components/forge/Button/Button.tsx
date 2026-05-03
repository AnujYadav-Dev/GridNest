'use client'

import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { cva, type VariantProps } from 'class-variance-authority'
import { ButtonProps } from './Button.types'
import { Loader2 } from 'lucide-react'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-[var(--gridnest-radius-md)] font-body font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gridnest-accent)] disabled:opacity-40 disabled:pointer-events-none select-none',
  {
    variants: {
      variant: {
        primary: 'bg-[var(--gridnest-accent)] text-white hover:bg-[var(--gridnest-accent-hover)] shadow-[var(--gridnest-shadow-glow)]',
        secondary: 'bg-[var(--gridnest-surface-2)] text-[var(--gridnest-text-primary)] border border-[var(--gridnest-border)] hover:border-[var(--gridnest-border-hover)]',
        ghost: 'text-[var(--gridnest-text-secondary)] hover:bg-[var(--gridnest-surface-2)] hover:text-[var(--gridnest-text-primary)]',
        danger: 'bg-[var(--gridnest-danger)] text-white hover:opacity-90',
      },
      size: {
        sm: 'h-8 px-3 text-sm',
        md: 'h-10 px-4 text-sm',
        lg: 'h-12 px-6 text-base',
      }
    },
    defaultVariants: { variant: 'primary', size: 'md' }
  }
)

const Button = forwardRef<HTMLButtonElement, ButtonProps & VariantProps<typeof buttonVariants>>(
  ({ className, variant, size, loading, children, onClick, onFocus, onBlur, onMouseEnter, onMouseLeave, onKeyDown, onKeyUp, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        className={twMerge(clsx(buttonVariants({ variant, size }), className))}
        whileTap={{ scale: 0.97 }}
        whileHover={{ y: -1 }}
        transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
        disabled={loading || props.disabled}
        onClick={onClick as React.MouseEventHandler<HTMLButtonElement>}
        onFocus={onFocus as React.FocusEventHandler<HTMLButtonElement>}
        onBlur={onBlur as React.FocusEventHandler<HTMLButtonElement>}
        onMouseEnter={onMouseEnter as React.MouseEventHandler<HTMLButtonElement>}
        onMouseLeave={onMouseLeave as React.MouseEventHandler<HTMLButtonElement>}
        onKeyDown={onKeyDown as React.KeyboardEventHandler<HTMLButtonElement>}
        onKeyUp={onKeyUp as React.KeyboardEventHandler<HTMLButtonElement>}
        type={props.type ?? 'button'}
        aria-label={props['aria-label']}
        id={props.id}
        name={props.name}
        value={props.value}
        form={props.form}
      >
        {loading && <Loader2 className="animate-spin" size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16} />}
        {children}
      </motion.button>
    )
  }
)

Button.displayName = 'Button'
export default Button
