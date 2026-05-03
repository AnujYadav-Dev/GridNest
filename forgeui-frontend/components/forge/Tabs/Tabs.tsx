'use client'

import { forwardRef } from 'react'
import * as TabsPrimitive from '@radix-ui/react-tabs'
import { motion } from 'framer-motion'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { TabsProps } from './Tabs.types'

const Tabs = forwardRef<React.ElementRef<typeof TabsPrimitive.Root>, TabsProps>(
  ({ className, tabs, defaultValue, orientation = 'horizontal', ...props }, ref) => {
    // If no default value is provided, use the first tab's value
    const defaultTab = defaultValue || (tabs.length > 0 ? tabs[0].value : undefined)

    return (
      <TabsPrimitive.Root
        ref={ref}
        defaultValue={defaultTab}
        orientation={orientation}
        className={twMerge(
          clsx("flex w-full", orientation === 'horizontal' ? "flex-col" : "flex-row gap-4", className)
        )}
        {...props}
      >
        <TabsPrimitive.List
          className={clsx(
            "flex shrink-0 border-[var(--forge-border)] overflow-x-auto no-scrollbar",
            orientation === 'horizontal' ? "flex-row border-b" : "flex-col border-r w-48"
          )}
        >
          {tabs.map((tab) => (
            <TabsPrimitive.Trigger
              key={tab.value}
              value={tab.value}
              className={clsx(
                "relative flex items-center justify-center px-4 py-2.5 text-sm font-medium font-body transition-colors outline-none",
                "text-[var(--forge-text-secondary)] hover:text-[var(--forge-text-primary)] data-[state=active]:text-[var(--forge-accent)]",
                "focus-visible:ring-2 focus-visible:ring-[var(--forge-accent)] focus-visible:ring-offset-2",
                orientation === 'horizontal' ? "border-b-2 border-transparent" : "border-r-2 border-transparent w-full justify-start"
              )}
            >
              <span className="relative z-10">{tab.label}</span>
              
              {/* Framer motion active indicator would go here, but Radix adds data-[state=active] so we can use CSS or motion */}
              {/* Note: In a real implementation we would need to know the currently active tab in state to use layoutId properly,
                  but for simplicity we'll rely on the CSS border or an absolute div */}
              <div className={clsx(
                "absolute bg-[var(--forge-accent)] transition-all duration-300 opacity-0 group-data-[state=active]:opacity-100",
                orientation === 'horizontal' ? "bottom-[-2px] left-0 right-0 h-[2px]" : "right-[-2px] top-0 bottom-0 w-[2px]"
              )} />
            </TabsPrimitive.Trigger>
          ))}
        </TabsPrimitive.List>

        {tabs.map((tab) => (
          <TabsPrimitive.Content
            key={tab.value}
            value={tab.value}
            className="flex-1 mt-4 outline-none focus-visible:ring-2 focus-visible:ring-[var(--forge-accent)] focus-visible:ring-offset-2 rounded-[var(--forge-radius-sm)]"
          >
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              {tab.content}
            </motion.div>
          </TabsPrimitive.Content>
        ))}
      </TabsPrimitive.Root>
    )
  }
)

Tabs.displayName = 'Tabs'
export default Tabs
