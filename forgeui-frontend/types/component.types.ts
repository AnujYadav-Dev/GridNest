export interface Component {
  id: number
  slug: string
  name: string
  category: ComponentCategory
  description: string
  isNew: boolean
  createdAt: string
}

export type ComponentCategory =
  | 'all'
  | 'form'
  | 'display'
  | 'feedback'
  | 'navigation'

export interface SavedComponent {
  id: number
  component: Component
  savedAt: string
}

export interface ThemeConfig {
  id: number
  name: string
  config: Record<string, string>
  isDefault: boolean
  createdAt: string
  updatedAt: string
}

export interface PropDef {
  name: string
  type: string
  default?: string
  required?: boolean
  description: string
}

export interface ComponentDoc {
  slug: string
  name: string
  category: ComponentCategory
  description: string
  isNew: boolean
  props: PropDef[]
  variants: string[]
  accessibilityNotes: string[]
  related: string[]
  code: string
  importStatement: string
}
