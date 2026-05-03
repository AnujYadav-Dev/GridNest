'use client'

import { forwardRef } from 'react'
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { DropdownProps } from './Dropdown.types'
import { AnimatePresence, motion } from 'framer-motion'

const Dropdown = forwardRef<React.ElementRef<typeof DropdownMenuPrimitive.Content>, DropdownProps>(
  ({ trigger, children, contentClassName, align = 'start', ...props }, ref) => {
    return (
      <DropdownMenuPrimitive.Root {...props}>
        <DropdownMenuPrimitive.Trigger asChild>
          {trigger}
        </DropdownMenuPrimitive.Trigger>
        
        <DropdownMenuPrimitive.Portal>
          <DropdownMenuPrimitive.Content
            ref={ref}
            align={align}
            sideOffset={8}
            asChild
            className={twMerge(
              clsx(
                "z-50 min-w-[8rem] overflow-hidden rounded-[var(--gridnest-radius-md)] border border-[var(--gridnest-border)] bg-[var(--gridnest-surface-2)] p-1 shadow-[var(--gridnest-shadow-md)]",
                contentClassName
              )
            )}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -5 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -5 }}
              transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              {children}
            </motion.div>
          </DropdownMenuPrimitive.Content>
        </DropdownMenuPrimitive.Portal>
      </DropdownMenuPrimitive.Root>
    )
  }
)

Dropdown.displayName = 'Dropdown'

export const DropdownItem = forwardRef<React.ElementRef<typeof DropdownMenuPrimitive.Item>, React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item>>(
  ({ className, ...props }, ref) => (
    <DropdownMenuPrimitive.Item
      ref={ref}
      className={twMerge(
        clsx(
          "relative flex cursor-default select-none items-center rounded-[var(--gridnest-radius-sm)] px-2 py-1.5 text-sm font-body outline-none transition-colors",
          "focus:bg-[var(--gridnest-accent)] focus:text-white data-[disabled]:pointer-events-none data-[disabled]:opacity-50 text-[var(--gridnest-text-primary)]",
          className
        )
      )}
      {...props}
    />
  )
)
DropdownItem.displayName = 'DropdownItem'

export const DropdownSeparator = forwardRef<React.ElementRef<typeof DropdownMenuPrimitive.Separator>, React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>>(
  ({ className, ...props }, ref) => (
    <DropdownMenuPrimitive.Separator
      ref={ref}
      className={twMerge(clsx("-mx-1 my-1 h-px bg-[var(--gridnest-border)]", className))}
      {...props}
    />
  )
)
DropdownSeparator.displayName = 'DropdownSeparator'

export const DropdownLabel = forwardRef<React.ElementRef<typeof DropdownMenuPrimitive.Label>, React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label>>(
  ({ className, ...props }, ref) => (
    <DropdownMenuPrimitive.Label
      ref={ref}
      className={twMerge(clsx("px-2 py-1.5 text-xs font-semibold text-[var(--gridnest-text-muted)]", className))}
      {...props}
    />
  )
)
DropdownLabel.displayName = 'DropdownLabel'

export default Dropdown
