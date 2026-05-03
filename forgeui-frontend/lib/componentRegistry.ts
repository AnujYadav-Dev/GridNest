import { ComponentDoc } from '@/types/component.types'

export const componentRegistry: Record<string, ComponentDoc> = {
  button: {
    slug: 'button',
    name: 'Button',
    category: 'form',
    description: 'A versatile button component with multiple variants, sizes, and a loading state. Built with CVA for variant management and Framer Motion for micro-interactions.',
    isNew: false,
    importStatement: `import { Button } from '@/components/forge'`,
    code: `import { Button } from '@/components/forge'

export default function Example() {
  return (
    <div className="flex flex-wrap gap-3">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="danger">Danger</Button>
      <Button variant="primary" loading>Loading...</Button>
      <Button variant="primary" size="sm">Small</Button>
      <Button variant="primary" size="lg">Large</Button>
      <Button variant="primary" disabled>Disabled</Button>
    </div>
  )
}`,
    props: [
      { name: 'variant', type: "'primary' | 'secondary' | 'ghost' | 'danger'", default: "'primary'", description: 'Visual style variant' },
      { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Controls height and padding' },
      { name: 'loading', type: 'boolean', default: 'false', description: 'Shows spinner and disables interaction' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the button' },
      { name: 'className', type: 'string', description: 'Additional CSS classes merged via clsx + tailwind-merge' },
      { name: 'children', type: 'React.ReactNode', required: true, description: 'Button content' },
    ],
    variants: ['primary', 'secondary', 'ghost', 'danger'],
    accessibilityNotes: [
      'Uses native <button> element for full keyboard support',
      'Disabled state communicated via aria-disabled',
      'Loading state sets aria-busy and visually indicated by spinner',
      'Focus ring uses --gridnest-accent color with focus-visible selector',
    ],
    related: ['badge', 'input', 'toggle'],
  },

  badge: {
    slug: 'badge',
    name: 'Badge',
    category: 'display',
    description: 'Compact label component for status indicators, tags, and counts. Supports a pulsing "live" animation variant.',
    isNew: false,
    importStatement: `import { Badge } from '@/components/forge'`,
    code: `import { Badge } from '@/components/forge'

export default function Example() {
  return (
    <div className="flex flex-wrap gap-2">
      <Badge>Default</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="danger">Danger</Badge>
      <Badge variant="accent">Accent</Badge>
      <Badge dot>With Dot</Badge>
      <Badge pulse>Live</Badge>
    </div>
  )
}`,
    props: [
      { name: 'variant', type: "'default' | 'success' | 'warning' | 'danger' | 'accent'", default: "'default'", description: 'Color variant' },
      { name: 'dot', type: 'boolean', default: 'false', description: 'Shows a colored dot indicator' },
      { name: 'pulse', type: 'boolean', default: 'false', description: 'Animates the dot with a pulsing effect for live status' },
    ],
    variants: ['default', 'success', 'warning', 'danger', 'accent'],
    accessibilityNotes: [
      'Use aria-label on the parent when badge content alone is not descriptive',
      'Pulse animation respects prefers-reduced-motion',
    ],
    related: ['avatar', 'card'],
  },

  avatar: {
    slug: 'avatar',
    name: 'Avatar',
    category: 'display',
    description: 'User representation with image support, fallback to initials, and optional status indicator dot.',
    isNew: false,
    importStatement: `import { Avatar } from '@/components/forge'`,
    code: `import { Avatar } from '@/components/forge'

export default function Example() {
  return (
    <div className="flex items-center gap-4">
      <Avatar src="/avatar.jpg" alt="User" size="sm" />
      <Avatar fallback="JD" size="md" status="online" />
      <Avatar fallback="AK" size="lg" status="away" />
      <Avatar fallback="FG" size="xl" />
    </div>
  )
}`,
    props: [
      { name: 'src', type: 'string', description: 'Image URL - shows fallback if undefined or fails' },
      { name: 'alt', type: 'string', description: 'Alt text for the avatar image' },
      { name: 'fallback', type: 'string', description: 'Initials or text shown when image is unavailable' },
      { name: 'size', type: "'sm' | 'md' | 'lg' | 'xl'", default: "'md'", description: 'Avatar diameter' },
      { name: 'status', type: "'online' | 'away' | 'offline'", description: 'Shows a status indicator dot' },
    ],
    variants: ['sm', 'md', 'lg', 'xl'],
    accessibilityNotes: [
      'Always provide alt text when using an image',
      'Status dot includes visually-hidden text for screen readers',
    ],
    related: ['badge', 'card'],
  },

  input: {
    slug: 'input',
    name: 'Input',
    category: 'form',
    description: 'Text input with label, helper text, error state, and optional icon adornments. Animated focus ring.',
    isNew: false,
    importStatement: `import { Input } from '@/components/forge'`,
    code: `import { Input } from '@/components/forge'
import { Mail } from 'lucide-react'

export default function Example() {
  return (
    <div className="flex flex-col gap-4 w-72">
      <Input label="Email" placeholder="you@example.com" type="email" />
      <Input label="Search" placeholder="Search..." leftIcon={<Mail size={14} />} />
      <Input label="Password" type="password" helper="Min 8 characters" />
      <Input label="Username" error="This username is taken" />
    </div>
  )
}`,
    props: [
      { name: 'label', type: 'string', description: 'Visible label above the input' },
      { name: 'helper', type: 'string', description: 'Helper text shown below the input' },
      { name: 'error', type: 'string', description: 'Error message - replaces helper text and applies error styling' },
      { name: 'leftIcon', type: 'React.ReactNode', description: 'Icon element rendered on the left side' },
      { name: 'rightIcon', type: 'React.ReactNode', description: 'Icon element rendered on the right side' },
      { name: 'type', type: 'string', default: "'text'", description: 'HTML input type' },
    ],
    variants: ['default', 'error'],
    accessibilityNotes: [
      'Label is always associated with input via htmlFor',
      'Error message is linked via aria-describedby',
      'Error state adds aria-invalid="true"',
    ],
    related: ['button', 'toggle'],
  },

  modal: {
    slug: 'modal',
    name: 'Modal',
    category: 'feedback',
    description: 'Full-featured modal with backdrop blur, scale + fade entrance animation, and focus trap via Radix Dialog portal.',
    isNew: false,
    importStatement: `import { Modal } from '@/components/forge'`,
    code: `import { useState } from 'react'
import { Modal } from '@/components/forge'
import { Button } from '@/components/forge'

export default function Example() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Modal</Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Confirm action"
        description="Are you sure you want to delete this item?"
      >
        <div className="flex gap-2 justify-end mt-6">
          <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="danger" onClick={() => setOpen(false)}>Delete</Button>
        </div>
      </Modal>
    </>
  )
}`,
    props: [
      { name: 'open', type: 'boolean', required: true, description: 'Controls modal visibility' },
      { name: 'onClose', type: '() => void', required: true, description: 'Callback when modal is dismissed' },
      { name: 'title', type: 'string', description: 'Modal heading' },
      { name: 'description', type: 'string', description: 'Subtext below the title' },
      { name: 'children', type: 'React.ReactNode', description: 'Modal body content' },
      { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Max width of the modal' },
    ],
    variants: ['sm', 'md', 'lg'],
    accessibilityNotes: [
      'Uses Radix Dialog for focus trap and Escape key dismissal',
      'Title is bound to aria-labelledby on the dialog role element',
      'Backdrop click dismisses the modal',
      'Focus returns to trigger element on close',
    ],
    related: ['toast', 'button'],
  },

  toast: {
    slug: 'toast',
    name: 'Toast',
    category: 'feedback',
    description: 'Slide-in notification from bottom-right with auto-dismiss, progress bar, and success/error/warning variants.',
    isNew: true,
    importStatement: `import { useToast } from '@/components/forge'`,
    code: `import { useToast } from '@/components/forge'
import { Button } from '@/components/forge'

export default function Example() {
  const { toast } = useToast()

  return (
    <div className="flex gap-3">
      <Button onClick={() => toast({ title: 'Saved!', variant: 'success' })}>
        Success Toast
      </Button>
      <Button
        variant="danger"
        onClick={() => toast({ title: 'Error', description: 'Something went wrong.', variant: 'error' })}
      >
        Error Toast
      </Button>
    </div>
  )
}`,
    props: [
      { name: 'title', type: 'string', required: true, description: 'Main toast message' },
      { name: 'description', type: 'string', description: 'Optional subtext' },
      { name: 'variant', type: "'default' | 'success' | 'error' | 'warning'", default: "'default'", description: 'Color and icon variant' },
      { name: 'duration', type: 'number', default: '4000', description: 'Auto-dismiss duration in ms' },
    ],
    variants: ['default', 'success', 'error', 'warning'],
    accessibilityNotes: [
      'Toast container has role="region" and aria-label="Notifications"',
      'Each toast has role="alert" for live region announcements',
      'Auto-dismiss pauses on focus/hover',
    ],
    related: ['modal', 'badge'],
  },

  card: {
    slug: 'card',
    name: 'Card',
    category: 'display',
    description: 'Container component with default, elevated, bordered, and interactive hover variants.',
    isNew: false,
    importStatement: `import { Card } from '@/components/forge'`,
    code: `import { Card } from '@/components/forge'

export default function Example() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <Card>Default card</Card>
      <Card variant="elevated">Elevated card</Card>
      <Card variant="bordered">Bordered card</Card>
      <Card variant="interactive">
        Interactive (hover me)
      </Card>
    </div>
  )
}`,
    props: [
      { name: 'variant', type: "'default' | 'elevated' | 'bordered' | 'interactive'", default: "'default'", description: 'Visual style variant' },
      { name: 'padding', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Internal padding' },
      { name: 'children', type: 'React.ReactNode', required: true, description: 'Card content' },
    ],
    variants: ['default', 'elevated', 'bordered', 'interactive'],
    accessibilityNotes: [
      'Interactive variant uses role="button" and keyboard handlers when onClick is provided',
      'Focus ring applied via focus-visible',
    ],
    related: ['badge', 'avatar', 'skeleton'],
  },

  tabs: {
    slug: 'tabs',
    name: 'Tabs',
    category: 'navigation',
    description: 'Tab navigation with an animated underline indicator, full keyboard navigation, and an optional vertical layout.',
    isNew: false,
    importStatement: `import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/forge'`,
    code: `import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/forge'

export default function Example() {
  return (
    <Tabs defaultValue="overview">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="code">Code</TabsTrigger>
        <TabsTrigger value="props">Props</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">Overview content</TabsContent>
      <TabsContent value="code">Code content</TabsContent>
      <TabsContent value="props">Props content</TabsContent>
    </Tabs>
  )
}`,
    props: [
      { name: 'defaultValue', type: 'string', description: 'Initially active tab value' },
      { name: 'value', type: 'string', description: 'Controlled active tab value' },
      { name: 'onValueChange', type: '(value: string) => void', description: 'Callback when active tab changes' },
      { name: 'orientation', type: "'horizontal' | 'vertical'", default: "'horizontal'", description: 'Layout direction' },
    ],
    variants: ['horizontal', 'vertical'],
    accessibilityNotes: [
      'Uses Radix Tabs - full keyboard navigation (Arrow keys, Home, End)',
      'Active tab has aria-selected="true"',
      'Tab panels use role="tabpanel"',
    ],
    related: ['accordion', 'dropdown'],
  },

  accordion: {
    slug: 'accordion',
    name: 'Accordion',
    category: 'navigation',
    description: 'Expand/collapse sections with spring-based animation. Supports single and multiple open items.',
    isNew: false,
    importStatement: `import { Accordion } from '@/components/forge'`,
    code: `import { Accordion } from '@/components/forge'

const items = [
  { id: 'q1', title: 'What is GridNest?', content: 'A production-grade design system.' },
  { id: 'q2', title: 'Is it free?', content: 'Yes, MIT licensed.' },
  { id: 'q3', title: 'Does it support TypeScript?', content: '100% TypeScript.' },
]

export default function Example() {
  return <Accordion items={items} />
}`,
    props: [
      { name: 'items', type: 'AccordionItem[]', required: true, description: 'Array of { id, title, content }' },
      { name: 'type', type: "'single' | 'multiple'", default: "'single'", description: 'Whether multiple items can be open simultaneously' },
      { name: 'defaultValue', type: 'string | string[]', description: 'Initially open item(s)' },
    ],
    variants: ['single', 'multiple'],
    accessibilityNotes: [
      'Uses Radix Accordion primitives',
      'Trigger has aria-expanded reflecting open state',
      'Panel has role="region" with aria-labelledby linking to trigger',
    ],
    related: ['tabs', 'dropdown'],
  },

  dropdown: {
    slug: 'dropdown',
    name: 'Dropdown',
    category: 'navigation',
    description: 'Radix-powered dropdown menu with animated open/close, keyboard navigation, and sub-menu support.',
    isNew: false,
    importStatement: `import { Dropdown } from '@/components/forge'`,
    code: `import { Dropdown } from '@/components/forge'
import { Button } from '@/components/forge'

const items = [
  { label: 'Edit', onClick: () => console.log('edit') },
  { label: 'Duplicate', onClick: () => console.log('dup') },
  { label: 'Delete', onClick: () => console.log('del'), destructive: true },
]

export default function Example() {
  return (
    <Dropdown
      trigger={<Button variant="secondary">Options ▾</Button>}
      items={items}
    />
  )
}`,
    props: [
      { name: 'trigger', type: 'React.ReactNode', required: true, description: 'Element that opens the dropdown' },
      { name: 'items', type: 'DropdownItem[]', required: true, description: 'Menu items with label, onClick, optional icon and destructive flag' },
      { name: 'align', type: "'start' | 'center' | 'end'", default: "'start'", description: 'Horizontal alignment of the menu' },
    ],
    variants: ['default'],
    accessibilityNotes: [
      'Uses Radix DropdownMenu for full keyboard navigation',
      'Trigger has aria-haspopup and aria-expanded',
      'Menu items have role="menuitem"',
    ],
    related: ['tabs', 'accordion'],
  },

  toggle: {
    slug: 'toggle',
    name: 'Toggle',
    category: 'form',
    description: 'Spring-physics animated switch with accessible label and multiple sizes.',
    isNew: false,
    importStatement: `import { Toggle } from '@/components/forge'`,
    code: `import { Toggle } from '@/components/forge'
import { useState } from 'react'

export default function Example() {
  const [on, setOn] = useState(false)

  return (
    <div className="flex flex-col gap-4">
      <Toggle checked={on} onChange={setOn} label="Enable notifications" />
      <Toggle checked={on} onChange={setOn} size="sm" label="Small toggle" />
      <Toggle checked={true} onChange={() => {}} label="Disabled" disabled />
    </div>
  )
}`,
    props: [
      { name: 'checked', type: 'boolean', required: true, description: 'Controlled on/off state' },
      { name: 'onChange', type: '(checked: boolean) => void', required: true, description: 'Callback when toggled' },
      { name: 'label', type: 'string', description: 'Accessible label text' },
      { name: 'size', type: "'sm' | 'md'", default: "'md'", description: 'Toggle size' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables interaction' },
    ],
    variants: ['sm', 'md'],
    accessibilityNotes: [
      'Uses role="switch" with aria-checked',
      'Label is associated via aria-label or visible text',
      'Animation respects prefers-reduced-motion',
    ],
    related: ['input', 'button'],
  },

  skeleton: {
    slug: 'skeleton',
    name: 'Skeleton',
    category: 'display',
    description: 'Shimmer animation placeholder for loading states. Composable with text, circle, and rectangle variants.',
    isNew: false,
    importStatement: `import { Skeleton } from '@/components/forge'`,
    code: `import { Skeleton } from '@/components/forge'

export default function Example() {
  return (
    <div className="flex flex-col gap-3 w-64">
      <Skeleton variant="circle" size={40} />
      <Skeleton variant="text" width="75%" />
      <Skeleton variant="text" width="50%" />
      <Skeleton variant="rectangle" height={120} />
    </div>
  )
}`,
    props: [
      { name: 'variant', type: "'text' | 'circle' | 'rectangle'", default: "'rectangle'", description: 'Shape of the skeleton' },
      { name: 'width', type: 'string | number', description: 'Width (string like "75%" or number in px)' },
      { name: 'height', type: 'number', description: 'Height in px' },
      { name: 'size', type: 'number', description: 'Both width and height for circle variant' },
    ],
    variants: ['text', 'circle', 'rectangle'],
    accessibilityNotes: [
      'Skeleton container has aria-busy="true" and aria-label="Loading"',
      'Shimmer animation pauses if prefers-reduced-motion is set',
    ],
    related: ['avatar', 'card'],
  },

  progress: {
    slug: 'progress',
    name: 'Progress',
    category: 'display',
    description: 'Animated progress bar supporting determinate and indeterminate modes with color variants.',
    isNew: false,
    importStatement: `import { Progress } from '@/components/forge'`,
    code: `import { Progress } from '@/components/forge'

export default function Example() {
  return (
    <div className="flex flex-col gap-4 w-64">
      <Progress value={65} />
      <Progress value={35} variant="success" />
      <Progress value={80} variant="warning" />
      <Progress indeterminate />
    </div>
  )
}`,
    props: [
      { name: 'value', type: 'number', description: 'Progress percentage 0–100' },
      { name: 'variant', type: "'default' | 'success' | 'warning' | 'danger'", default: "'default'", description: 'Color variant' },
      { name: 'indeterminate', type: 'boolean', default: 'false', description: 'Animated loading state without a set value' },
      { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Track height' },
    ],
    variants: ['default', 'success', 'warning', 'danger'],
    accessibilityNotes: [
      'Uses role="progressbar" with aria-valuenow, aria-valuemin, aria-valuemax',
      'Indeterminate mode uses aria-label instead of aria-valuenow',
    ],
    related: ['skeleton', 'badge'],
  },

  tooltip: {
    slug: 'tooltip',
    name: 'Tooltip',
    category: 'feedback',
    description: 'Radix-powered tooltip with custom GridNest styling and smooth appear/disappear animation.',
    isNew: false,
    importStatement: `import { Tooltip } from '@/components/forge'`,
    code: `import { Tooltip } from '@/components/forge'
import { Button } from '@/components/forge'

export default function Example() {
  return (
    <Tooltip content="This is a tooltip">
      <Button variant="secondary">Hover me</Button>
    </Tooltip>
  )
}`,
    props: [
      { name: 'content', type: 'React.ReactNode', required: true, description: 'Tooltip content' },
      { name: 'side', type: "'top' | 'right' | 'bottom' | 'left'", default: "'top'", description: 'Preferred side to render' },
      { name: 'delay', type: 'number', default: '300', description: 'Open delay in ms' },
      { name: 'children', type: 'React.ReactNode', required: true, description: 'The trigger element' },
    ],
    variants: ['top', 'right', 'bottom', 'left'],
    accessibilityNotes: [
      'Radix Tooltip provides aria-describedby linking trigger to content',
      'Keyboard accessible - opens on focus',
      'Closes on Escape or blur',
    ],
    related: ['badge', 'button'],
  },
}
