import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { ReactNode } from 'react'

export interface AccordionItemData {
  value: string
  trigger: ReactNode
  content: ReactNode
}

export interface AccordionProps extends Omit<React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Root>, 'type'> {
  items: AccordionItemData[]
  type?: 'single' | 'multiple'
}
