'use client'

import { forwardRef, useEffect, useState } from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { X, CheckCircle2, AlertTriangle, XCircle, Info } from 'lucide-react'
import { ToastProps } from './Toast.types'
import { motion, AnimatePresence } from 'framer-motion'

const Toast = forwardRef<HTMLDivElement, ToastProps>(
  ({ className, title, description, variant = 'default', duration = 5000, onClose, ...props }, ref) => {
    const [isVisible, setIsVisible] = useState(true)

    useEffect(() => {
      if (duration && duration > 0) {
        const timer = setTimeout(() => {
          handleClose()
        }, duration)
        return () => clearTimeout(timer)
      }
    }, [duration])

    const handleClose = () => {
      setIsVisible(false)
      setTimeout(() => {
        onClose?.()
      }, 300) // Wait for exit animation
    }

    const Icon = 
      variant === 'success' ? CheckCircle2 :
      variant === 'warning' ? AlertTriangle :
      variant === 'danger' ? XCircle : Info

    return (
      <AnimatePresence>
        {isVisible && (
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className={twMerge(
              clsx(
                "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-[var(--forge-radius-lg)] border p-4 shadow-[var(--forge-shadow-md)] transition-all",
                variant === 'default' ? "border-[var(--forge-border)] bg-[var(--forge-surface-2)] text-[var(--forge-text-primary)]" :
                variant === 'success' ? "border-[var(--forge-success)]/20 bg-[var(--forge-success)]/10 text-[var(--forge-success)]" :
                variant === 'warning' ? "border-[var(--forge-warning)]/20 bg-[var(--forge-warning)]/10 text-[var(--forge-warning)]" :
                "border-[var(--forge-danger)]/20 bg-[var(--forge-danger)]/10 text-[var(--forge-danger)]",
                className
              )
            )}
            id={props.id}
            role={props.role}
            aria-label={props['aria-label']}
          >
            <div className="flex w-full items-start gap-3">
              <Icon className="mt-0.5 h-5 w-5 shrink-0" />
              <div className="flex flex-col gap-1 w-full">
                {title && <h3 className="text-sm font-semibold font-sans">{title}</h3>}
                {description && (
                  <div className={clsx("text-sm font-body opacity-90", variant === 'default' && "text-[var(--forge-text-secondary)]")}>
                    {description}
                  </div>
                )}
              </div>
            </div>
            
            <button
              onClick={handleClose}
              className="absolute right-2 top-2 rounded-md p-1 opacity-0 transition-opacity hover:bg-black/5 focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100"
            >
              <X className="h-4 w-4" />
            </button>
            
            {/* Progress bar for auto-dismiss */}
            {duration && duration > 0 && (
              <motion.div 
                className={clsx(
                  "absolute bottom-0 left-0 h-1",
                  variant === 'default' ? "bg-[var(--forge-accent)]" :
                  variant === 'success' ? "bg-[var(--forge-success)]" :
                  variant === 'warning' ? "bg-[var(--forge-warning)]" :
                  "bg-[var(--forge-danger)]"
                )}
                initial={{ width: "100%" }}
                animate={{ width: "0%" }}
                transition={{ duration: duration / 1000, ease: "linear" }}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    )
  }
)

Toast.displayName = 'Toast'
export default Toast
