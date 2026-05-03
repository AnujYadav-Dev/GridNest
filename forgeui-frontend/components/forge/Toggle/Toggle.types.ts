import * as TogglePrimitive from '@radix-ui/react-toggle'

export interface ToggleProps extends React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> {
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'outline'
}
