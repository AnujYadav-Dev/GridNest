import * as TabsPrimitive from '@radix-ui/react-tabs'
import { ReactNode } from 'react'

export interface TabsProps extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root> {
  tabs: {
    value: string
    label: ReactNode
    content: ReactNode
  }[]
}
