'use client'

import { forwardRef } from 'react'
import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { TooltipProps } from './Tooltip.types'

// Setup global provider
export const TooltipProvider = TooltipPrimitive.Provider

const Tooltip = forwardRef<React.ElementRef<typeof TooltipPrimitive.Content>, TooltipProps>(
  ({ className, content, children, delayDuration = 300, side = 'top', align = 'center', ...props }, ref) => {
    return (
      <TooltipPrimitive.Root delayDuration={delayDuration}>
        <TooltipPrimitive.Trigger asChild>
          {children}
        </TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            ref={ref}
            side={side}
            align={align}
            sideOffset={6}
            className={twMerge(
              clsx(
                "z-50 overflow-hidden rounded-[var(--gridnest-radius-md)] bg-[var(--gridnest-surface-2)] px-3 py-1.5 text-xs font-medium font-body text-[var(--gridnest-text-primary)] border border-[var(--gridnest-border)] shadow-[var(--gridnest-shadow-md)]",
                "animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
                className
              )
            )}
            {...props}
          >
            {content}
            <TooltipPrimitive.Arrow className="fill-[var(--gridnest-border)]" width={11} height={5} />
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    )
  }
)

Tooltip.displayName = 'Tooltip'
export default Tooltip
