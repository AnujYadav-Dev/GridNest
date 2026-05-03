'use client'

import { forwardRef, useState } from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { InputProps } from './Input.types'
import { motion, AnimatePresence } from 'framer-motion'

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, helperText, error, iconLeft, iconRight, id, disabled, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false)
    const hasError = !!error
    
    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label 
            htmlFor={id} 
            className={clsx("text-sm font-medium transition-colors", hasError ? "text-[var(--forge-danger)]" : "text-[var(--forge-text-primary)]", disabled && "opacity-50")}
          >
            {label}
          </label>
        )}
        
        <div className="relative flex items-center w-full">
          {iconLeft && (
            <div className={clsx("absolute left-3 flex items-center justify-center pointer-events-none", hasError ? "text-[var(--forge-danger)]" : "text-[var(--forge-text-secondary)]", disabled && "opacity-50")}>
              {iconLeft}
            </div>
          )}
          
          <input
            ref={ref}
            id={id}
            disabled={disabled}
            onFocus={(e) => { setIsFocused(true); props.onFocus?.(e) }}
            onBlur={(e) => { setIsFocused(false); props.onBlur?.(e) }}
            className={twMerge(
              clsx(
                "flex h-10 w-full rounded-[var(--forge-radius-md)] border bg-[var(--forge-surface-2)] px-3 py-2 text-sm text-[var(--forge-text-primary)] font-body placeholder:text-[var(--forge-text-muted)] transition-all outline-none",
                hasError 
                  ? "border-[var(--forge-danger)] focus:ring-2 focus:ring-[var(--forge-danger)]/20" 
                  : "border-[var(--forge-border)] hover:border-[var(--forge-border-hover)] focus:border-[var(--forge-accent)] focus:ring-2 focus:ring-[var(--forge-accent)]/20",
                iconLeft && "pl-10",
                iconRight && "pr-10",
                disabled && "cursor-not-allowed opacity-50",
                className
              )
            )}
            {...props}
          />
          
          {iconRight && (
            <div className={clsx("absolute right-3 flex items-center justify-center", disabled && "opacity-50")}>
              {iconRight}
            </div>
          )}
        </div>
        
        <AnimatePresence>
          {(helperText || hasError) && (
            <motion.p
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: 'auto', marginTop: 4 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              className={clsx("text-xs", hasError ? "text-[var(--forge-danger)]" : "text-[var(--forge-text-secondary)]")}
            >
              {typeof error === 'string' ? error : helperText}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    )
  }
)

Input.displayName = 'Input'
export default Input
