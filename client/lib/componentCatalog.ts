import { ComponentCategory } from '@/types/component.types'
import { componentRegistry } from './componentRegistry'

export const CATEGORY_LABELS: Record<ComponentCategory, string> = {
  all: 'All',
  form: 'Form',
  display: 'Display',
  feedback: 'Feedback',
  navigation: 'Navigation',
  layout: 'Layout',
  data: 'Data',
  overlay: 'Overlay',
  typography: 'Typography',
  media: 'Media',
  command: 'Command',
}

export const CATEGORY_ORDER: ComponentCategory[] = [
  'form',
  'display',
  'feedback',
  'navigation',
  'layout',
  'data',
  'overlay',
  'typography',
  'media',
  'command',
]

export const componentList = Object.values(componentRegistry)

export const componentCategories = [
  { value: 'all' as const, label: CATEGORY_LABELS.all },
  ...CATEGORY_ORDER.map((value) => ({ value, label: CATEGORY_LABELS[value] })),
]

export const sidebarCategories = CATEGORY_ORDER
  .map((category) => ({
    category,
    label: CATEGORY_LABELS[category],
    items: componentList.filter((component) => component.category === category),
  }))
  .filter((group) => group.items.length > 0)
