import * as DialogPrimitive from '@radix-ui/react-dialog'
import { ReactNode } from 'react'

export interface ModalProps extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Root> {
  trigger?: ReactNode
  title?: ReactNode
  description?: ReactNode
  children: ReactNode
  footer?: ReactNode
}
