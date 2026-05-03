'use client'

import { forwardRef } from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { ModalProps } from './Modal.types'
import { AnimatePresence, motion } from 'framer-motion'

const Modal = forwardRef<React.ElementRef<typeof DialogPrimitive.Content>, ModalProps>(
  ({ trigger, title, description, children, footer, open, onOpenChange, ...props }, ref) => {
    return (
      <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
        {trigger && <DialogPrimitive.Trigger asChild>{trigger}</DialogPrimitive.Trigger>}
        <AnimatePresence>
          <DialogPrimitive.Portal forceMount>
            <DialogPrimitive.Overlay asChild>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity"
              />
            </DialogPrimitive.Overlay>
            
            <DialogPrimitive.Content asChild {...props}>
              <motion.div
                ref={ref}
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className={twMerge(
                  clsx(
                    "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border border-[var(--forge-border)] bg-[var(--forge-surface)] p-6 shadow-lg duration-200 sm:rounded-[var(--forge-radius-xl)] outline-none"
                  )
                )}
              >
                <div className="flex flex-col space-y-1.5 text-center sm:text-left">
                  {title && (
                    <DialogPrimitive.Title className="text-lg font-semibold leading-none tracking-tight font-sans text-[var(--forge-text-primary)]">
                      {title}
                    </DialogPrimitive.Title>
                  )}
                  {description && (
                    <DialogPrimitive.Description className="text-sm text-[var(--forge-text-secondary)] font-body">
                      {description}
                    </DialogPrimitive.Description>
                  )}
                </div>
                
                <div className="py-2">
                  {children}
                </div>
                
                {footer && (
                  <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
                    {footer}
                  </div>
                )}
                
                <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-[var(--forge-accent)] focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                  <X className="h-4 w-4" />
                  <span className="sr-only">Close</span>
                </DialogPrimitive.Close>
              </motion.div>
            </DialogPrimitive.Content>
          </DialogPrimitive.Portal>
        </AnimatePresence>
      </DialogPrimitive.Root>
    )
  }
)

Modal.displayName = 'Modal'
export default Modal
