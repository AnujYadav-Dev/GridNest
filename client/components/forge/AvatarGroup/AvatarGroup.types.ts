import { HTMLAttributes } from 'react'

export interface AvatarGroupItem {
  initials: string
  label?: string
}

export interface AvatarGroupProps extends HTMLAttributes<HTMLDivElement> {
  items: AvatarGroupItem[]
  max?: number
}
