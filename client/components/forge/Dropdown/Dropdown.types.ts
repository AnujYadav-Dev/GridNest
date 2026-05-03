import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import { ReactNode } from 'react'

export interface DropdownProps extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Root> {
  trigger: ReactNode
  children: ReactNode
  contentClassName?: string
  align?: 'start' | 'center' | 'end'
}
