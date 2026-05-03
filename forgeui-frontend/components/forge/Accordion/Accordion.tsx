'use client'

import { forwardRef } from 'react'
import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { ChevronDown } from 'lucide-react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { AccordionProps } from './Accordion.types'
import { motion, AnimatePresence } from 'framer-motion'

const Accordion = forwardRef<React.ElementRef<typeof AccordionPrimitive.Root>, AccordionProps>(
  ({ className, items, type = 'single', ...props }, ref) => {
    return (
      // @ts-ignore - Radix type conditional logic is tricky to wrap perfectly
      <AccordionPrimitive.Root
        ref={ref}
        type={type as any}
        collapsible={type === 'single' ? true : undefined}
        className={twMerge(clsx("w-full rounded-[var(--forge-radius-md)] border border-[var(--forge-border)] bg-[var(--forge-surface-2)] overflow-hidden", className))}
        {...props}
      >
        {items.map((item, index) => (
          <AccordionPrimitive.Item
            key={item.value}
            value={item.value}
            className={clsx(
              "overflow-hidden focus-within:relative focus-within:z-10",
              index < items.length - 1 && "border-b border-[var(--forge-border)]"
            )}
          >
            <AccordionPrimitive.Header className="flex">
              <AccordionPrimitive.Trigger
                className={clsx(
                  "flex flex-1 items-center justify-between py-4 px-5 text-sm font-medium font-body transition-all hover:bg-[var(--forge-surface)] text-[var(--forge-text-primary)]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--forge-accent)] focus-visible:ring-inset",
                  "[&[data-state=open]>svg]:rotate-180"
                )}
              >
                {item.trigger}
                <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-300 ease-[var(--forge-ease-spring)] text-[var(--forge-text-secondary)]" />
              </AccordionPrimitive.Trigger>
            </AccordionPrimitive.Header>
            <AccordionPrimitive.Content
              className={clsx(
                "overflow-hidden text-sm font-body text-[var(--forge-text-secondary)]",
                "data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
              )}
            >
              <div className="pb-4 pt-0 px-5">
                {item.content}
              </div>
            </AccordionPrimitive.Content>
          </AccordionPrimitive.Item>
        ))}
      </AccordionPrimitive.Root>
    )
  }
)

Accordion.displayName = 'Accordion'
export default Accordion
