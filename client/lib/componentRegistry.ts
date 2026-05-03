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
    category: 'media',
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
      <Input label="Search" placeholder="Search..." iconLeft={<Mail size={14} />} />
      <Input label="Password" type="password" helperText="Min 8 characters" />
      <Input label="Username" error="This username is taken" />
    </div>
  )
}`,
    props: [
      { name: 'label', type: 'string', description: 'Visible label above the input' },
      { name: 'helperText', type: 'string', description: 'Helper text shown below the input' },
      { name: 'error', type: 'string', description: 'Error message - replaces helper text and applies error styling' },
      { name: 'iconLeft', type: 'React.ReactNode', description: 'Icon element rendered on the left side' },
      { name: 'iconRight', type: 'React.ReactNode', description: 'Icon element rendered on the right side' },
      { name: 'type', type: 'string', default: "'text'", description: 'HTML input type' },
    ],
    variants: ['default', 'error'],
    accessibilityNotes: [
      'Label is always associated with input via htmlFor',
      'Error message is linked via aria-describedby',
      'Error state adds aria-invalid="true"',
    ],
    related: ['button', 'toggle', 'checkbox', 'select'],
  },

  checkbox: {
    slug: 'checkbox',
    name: 'Checkbox',
    category: 'form',
    description: 'Accessible checkbox control with visible label, optional helper text, disabled state, and token-based focus styling.',
    isNew: true,
    importStatement: `import { Checkbox } from '@/components/forge'`,
    code: `import { Checkbox } from '@/components/forge'

export default function Example() {
  return (
    <div className="flex flex-col gap-4">
      <Checkbox label="Enable motion" description="Use tasteful transitions." defaultChecked />
      <Checkbox label="Send release notes" />
      <Checkbox label="Locked setting" disabled />
    </div>
  )
}`,
    props: [
      { name: 'label', type: 'React.ReactNode', description: 'Visible label next to the checkbox' },
      { name: 'description', type: 'React.ReactNode', description: 'Optional helper copy below the label' },
      { name: 'checked', type: 'boolean', description: 'Controlled checked state' },
      { name: 'defaultChecked', type: 'boolean', description: 'Initial checked state for uncontrolled usage' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables interaction' },
    ],
    variants: ['default', 'checked', 'disabled'],
    accessibilityNotes: [
      'Uses a native checkbox input for keyboard and screen reader support',
      'Visible label is associated with the input via htmlFor',
      'Focus ring is applied directly to the input',
    ],
    related: ['input', 'select', 'toggle'],
  },

  select: {
    slug: 'select',
    name: 'Select',
    category: 'form',
    description: 'Native select field styled with GridNest tokens, label support, helper text, disabled state, and error feedback.',
    isNew: true,
    importStatement: `import { Select } from '@/components/forge'`,
    code: `import { Select } from '@/components/forge'

const options = [
  { value: 'form', label: 'Form' },
  { value: 'display', label: 'Display' },
  { value: 'feedback', label: 'Feedback' },
  { value: 'navigation', label: 'Navigation' },
]

export default function Example() {
  return (
    <Select
      label="Category"
      helperText="Choose where this component belongs."
      options={options}
      defaultValue="feedback"
    />
  )
}`,
    props: [
      { name: 'options', type: '{ value: string; label: React.ReactNode; disabled?: boolean }[]', required: true, description: 'Options rendered inside the select' },
      { name: 'label', type: 'React.ReactNode', description: 'Visible label above the select' },
      { name: 'helperText', type: 'React.ReactNode', description: 'Helper text shown below the select' },
      { name: 'error', type: 'React.ReactNode', description: 'Error message and invalid styling' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables interaction' },
    ],
    variants: ['default', 'error', 'disabled'],
    accessibilityNotes: [
      'Uses a native select element for platform keyboard support',
      'Label is linked to the select via htmlFor',
      'Error state sets aria-invalid',
    ],
    related: ['input', 'checkbox', 'dropdown'],
  },

  alert: {
    slug: 'alert',
    name: 'Alert',
    category: 'feedback',
    description: 'Inline status message for confirmations, warnings, errors, and neutral information.',
    isNew: true,
    importStatement: `import { Alert } from '@/components/forge'`,
    code: `import { Alert } from '@/components/forge'

export default function Example() {
  return (
    <div className="flex flex-col gap-3">
      <Alert title="Component saved">Your changes are ready to reuse.</Alert>
      <Alert variant="success" title="Published">The token export completed.</Alert>
      <Alert variant="warning" title="Review needed">One prop value may need attention.</Alert>
      <Alert variant="danger" title="Failed">The request could not be completed.</Alert>
    </div>
  )
}`,
    props: [
      { name: 'variant', type: "'info' | 'success' | 'warning' | 'danger'", default: "'info'", description: 'Visual tone and default icon' },
      { name: 'title', type: 'React.ReactNode', description: 'Optional alert heading' },
      { name: 'icon', type: 'React.ReactNode', description: 'Custom icon override' },
      { name: 'children', type: 'React.ReactNode', description: 'Alert body content' },
    ],
    variants: ['info', 'success', 'warning', 'danger'],
    accessibilityNotes: [
      'Uses role="status" for non-interruptive announcements',
      'Color is paired with icon and text, not used alone',
    ],
    related: ['toast', 'modal', 'badge'],
  },

  modal: {
    slug: 'modal',
    name: 'Modal',
    category: 'overlay',
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
        onOpenChange={setOpen}
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
      { name: 'onOpenChange', type: '(open: boolean) => void', description: 'Callback when modal open state changes' },
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
    category: 'overlay',
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
    importStatement: `import { Dropdown, DropdownItem, DropdownLabel, DropdownSeparator } from '@/components/forge'`,
    code: `import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownLabel,
  DropdownSeparator,
} from '@/components/forge'

export default function Example() {
  return (
    <Dropdown trigger={<Button variant="secondary">Options</Button>}>
      <DropdownLabel>Actions</DropdownLabel>
      <DropdownItem>Edit component</DropdownItem>
      <DropdownItem>Duplicate</DropdownItem>
      <DropdownSeparator />
      <DropdownItem className="text-[var(--gridnest-danger)]">
        Delete
      </DropdownItem>
    </Dropdown>
  )
}`,
    props: [
      { name: 'trigger', type: 'React.ReactNode', required: true, description: 'Element that opens the dropdown' },
      { name: 'children', type: 'React.ReactNode', required: true, description: 'Dropdown menu content such as items, labels, and separators' },
      { name: 'align', type: "'start' | 'center' | 'end'", default: "'start'", description: 'Horizontal alignment of the menu' },
      { name: 'contentClassName', type: 'string', description: 'Additional classes for the dropdown content surface' },
    ],
    variants: ['item', 'label', 'separator', 'checkbox'],
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

  textarea: {
    slug: 'textarea',
    name: 'Textarea',
    category: 'form',
    description: 'Multi-line text field with label, helper text, disabled state, and error styling.',
    isNew: true,
    importStatement: `import { Textarea } from '@/components/forge'`,
    code: `import { Textarea } from '@/components/forge'

export default function Example() {
  return (
    <Textarea
      label="Release notes"
      helperText="Resize the field if you need more room."
      placeholder="What changed?"
    />
  )
}`,
    props: [
      { name: 'label', type: 'React.ReactNode', description: 'Visible label above the textarea' },
      { name: 'helperText', type: 'React.ReactNode', description: 'Helper copy below the textarea' },
      { name: 'error', type: 'React.ReactNode', description: 'Error message and invalid styling' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables interaction' },
    ],
    variants: ['default', 'error', 'disabled'],
    accessibilityNotes: [
      'Uses a native textarea element',
      'Label is linked with htmlFor',
      'Error state sets aria-invalid',
    ],
    related: ['input', 'select'],
  },

  'radio-group': {
    slug: 'radio-group',
    name: 'Radio Group',
    category: 'form',
    description: 'Accessible radio option group with descriptions, disabled options, and controlled or uncontrolled state.',
    isNew: true,
    importStatement: `import { RadioGroup } from '@/components/forge'`,
    code: `import { RadioGroup } from '@/components/forge'

const options = [
  { value: 'compact', label: 'Compact', description: 'Higher information density.' },
  { value: 'comfortable', label: 'Comfortable', description: 'Balanced spacing.' },
  { value: 'spacious', label: 'Spacious', description: 'More breathing room.' },
]

export default function Example() {
  return <RadioGroup name="density" options={options} defaultValue="comfortable" />
}`,
    props: [
      { name: 'name', type: 'string', required: true, description: 'Shared radio input name' },
      { name: 'options', type: 'RadioOption[]', required: true, description: 'Radio options rendered in order' },
      { name: 'value', type: 'string', description: 'Controlled selected value' },
      { name: 'defaultValue', type: 'string', description: 'Initial selected value' },
      { name: 'onValueChange', type: '(value: string) => void', description: 'Callback when selection changes' },
    ],
    variants: ['default', 'disabled'],
    accessibilityNotes: [
      'Uses native radio inputs',
      'Group exposes role="radiogroup"',
      'Labels are linked to each option',
    ],
    related: ['checkbox', 'select', 'toggle'],
  },

  stepper: {
    slug: 'stepper',
    name: 'Stepper',
    category: 'form',
    description: 'Compact numeric control with increment/decrement buttons and min/max clamping.',
    isNew: true,
    importStatement: `import { Stepper } from '@/components/forge'`,
    code: `import { Stepper } from '@/components/forge'

export default function Example() {
  return <Stepper defaultValue={4} min={0} max={10} />
}`,
    props: [
      { name: 'value', type: 'number', description: 'Controlled numeric value' },
      { name: 'defaultValue', type: 'number', default: '0', description: 'Initial uncontrolled value' },
      { name: 'min', type: 'number', default: '0', description: 'Minimum value' },
      { name: 'max', type: 'number', default: '100', description: 'Maximum value' },
      { name: 'step', type: 'number', default: '1', description: 'Amount changed per click' },
    ],
    variants: ['default'],
    accessibilityNotes: [
      'Uses native buttons for increment and decrement',
      'Buttons disable at min and max boundaries',
      'Current value is exposed through an output element',
    ],
    related: ['input', 'button'],
  },

  breadcrumb: {
    slug: 'breadcrumb',
    name: 'Breadcrumb',
    category: 'navigation',
    description: 'Hierarchical navigation trail with current-page semantics and compact separators.',
    isNew: true,
    importStatement: `import { Breadcrumb } from '@/components/forge'`,
    code: `import { Breadcrumb } from '@/components/forge'

export default function Example() {
  return (
    <Breadcrumb
      items={[
        { label: 'Components', href: '/components' },
        { label: 'Navigation', href: '/components?category=navigation' },
        { label: 'Breadcrumb' },
      ]}
    />
  )
}`,
    props: [
      { name: 'items', type: '{ label: React.ReactNode; href?: string }[]', required: true, description: 'Breadcrumb trail items' },
    ],
    variants: ['default'],
    accessibilityNotes: [
      'Wrapped in a nav with aria-label="Breadcrumb"',
      'Current item receives aria-current="page"',
      'Links remain normal anchors for expected browser behavior',
    ],
    related: ['pagination', 'tabs'],
  },

  pagination: {
    slug: 'pagination',
    name: 'Pagination',
    category: 'navigation',
    description: 'Page navigation control with previous/next buttons, active page state, and current-page semantics.',
    isNew: true,
    importStatement: `import { Pagination } from '@/components/forge'`,
    code: `import { useState } from 'react'
import { Pagination } from '@/components/forge'

export default function Example() {
  const [page, setPage] = useState(2)
  return <Pagination page={page} totalPages={5} onPageChange={setPage} />
}`,
    props: [
      { name: 'page', type: 'number', required: true, description: 'Current page' },
      { name: 'totalPages', type: 'number', required: true, description: 'Total number of pages' },
      { name: 'onPageChange', type: '(page: number) => void', description: 'Callback when a page is selected' },
    ],
    variants: ['default'],
    accessibilityNotes: [
      'Wrapped in a nav with aria-label="Pagination"',
      'Active page receives aria-current="page"',
      'Previous and next buttons disable at boundaries',
    ],
    related: ['breadcrumb', 'button'],
  },

  divider: {
    slug: 'divider',
    name: 'Divider',
    category: 'layout',
    description: 'Horizontal or vertical separator with optional centered label for section breaks.',
    isNew: true,
    importStatement: `import { Divider } from '@/components/forge'`,
    code: `import { Divider } from '@/components/forge'

export default function Example() {
  return <Divider label="or continue with" />
}`,
    props: [
      { name: 'orientation', type: "'horizontal' | 'vertical'", default: "'horizontal'", description: 'Separator direction' },
      { name: 'label', type: 'string', description: 'Optional label for horizontal dividers' },
    ],
    variants: ['horizontal', 'vertical', 'labeled'],
    accessibilityNotes: [
      'Uses role="separator"',
      'Sets aria-orientation when rendered as a separator',
    ],
    related: ['card', 'empty-state'],
  },

  'empty-state': {
    slug: 'empty-state',
    name: 'Empty State',
    category: 'layout',
    description: 'Composed empty-content panel with icon, title, description, and optional action slot.',
    isNew: true,
    importStatement: `import { EmptyState, Button } from '@/components/forge'`,
    code: `import { EmptyState, Button } from '@/components/forge'

export default function Example() {
  return (
    <EmptyState
      title="No saved components"
      description="Start by browsing the library and saving the patterns you use most."
      action={<Button size="sm">Browse components</Button>}
    />
  )
}`,
    props: [
      { name: 'title', type: 'React.ReactNode', required: true, description: 'Primary empty state message' },
      { name: 'description', type: 'React.ReactNode', description: 'Supporting copy' },
      { name: 'icon', type: 'React.ReactNode', description: 'Custom icon slot' },
      { name: 'action', type: 'React.ReactNode', description: 'Optional action slot' },
    ],
    variants: ['default'],
    accessibilityNotes: [
      'Keeps action content in normal tab order',
      'Icon is decorative unless a custom icon adds its own label',
    ],
    related: ['button', 'card', 'divider'],
  },

  kbd: {
    slug: 'kbd',
    name: 'Kbd',
    category: 'typography',
    description: 'Keyboard shortcut token for command hints, menus, and documentation.',
    isNew: true,
    importStatement: `import { Kbd } from '@/components/forge'`,
    code: `import { Kbd } from '@/components/forge'

export default function Example() {
  return (
    <div className="flex items-center gap-2">
      <Kbd>Ctrl</Kbd>
      <Kbd>K</Kbd>
    </div>
  )
}`,
    props: [
      { name: 'size', type: "'sm' | 'md'", default: "'md'", description: 'Shortcut key size' },
      { name: 'children', type: 'React.ReactNode', required: true, description: 'Shortcut text' },
    ],
    variants: ['sm', 'md'],
    accessibilityNotes: [
      'Uses semantic kbd element',
      'Text remains readable without relying on color',
    ],
    related: ['tooltip', 'button'],
  },

  spinner: {
    slug: 'spinner',
    name: 'Spinner',
    category: 'feedback',
    description: 'Accessible loading indicator with size variants and screen-reader label.',
    isNew: true,
    importStatement: `import { Spinner } from '@/components/forge'`,
    code: `import { Spinner } from '@/components/forge'

export default function Example() {
  return <Spinner label="Loading components" />
}`,
    props: [
      { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Spinner icon size' },
      { name: 'label', type: 'string', default: "'Loading'", description: 'Accessible loading label' },
    ],
    variants: ['sm', 'md', 'lg'],
    accessibilityNotes: [
      'Uses role="status"',
      'Includes a screen-reader label',
    ],
    related: ['progress', 'button'],
  },

  stat: {
    slug: 'stat',
    name: 'Stat',
    category: 'data',
    description: 'Compact metric card with label, value, change text, and trend tone.',
    isNew: true,
    importStatement: `import { Stat } from '@/components/forge'`,
    code: `import { Stat } from '@/components/forge'

export default function Example() {
  return <Stat label="Components" value="27" change="+10 added" trend="up" />
}`,
    props: [
      { name: 'label', type: 'React.ReactNode', required: true, description: 'Metric label' },
      { name: 'value', type: 'React.ReactNode', required: true, description: 'Metric value' },
      { name: 'change', type: 'React.ReactNode', description: 'Supporting change text' },
      { name: 'trend', type: "'up' | 'down' | 'neutral'", default: "'neutral'", description: 'Change text tone' },
    ],
    variants: ['up', 'down', 'neutral'],
    accessibilityNotes: [
      'Uses semantic text instead of color-only state',
      'Card content reads in label, value, change order',
    ],
    related: ['card', 'badge'],
  },

  table: {
    slug: 'table',
    name: 'Table',
    category: 'data',
    description: 'Responsive data table with typed columns, alignment controls, sticky styling foundations, and token-based borders.',
    isNew: true,
    importStatement: `import { Table } from '@/components/forge'`,
    code: `import { Table } from '@/components/forge'

export default function Example() {
  return (
    <Table
      columns={[
        { key: 'component', header: 'Component' },
        { key: 'category', header: 'Category' },
        { key: 'status', header: 'Status', align: 'right' },
      ]}
      rows={[
        { component: 'Button', category: 'Form', status: 'Stable' },
        { component: 'Table', category: 'Data', status: 'New' },
      ]}
    />
  )
}`,
    props: [
      { name: 'columns', type: 'TableColumn<T>[]', required: true, description: 'Column definitions with key, header, and optional alignment' },
      { name: 'rows', type: 'T[]', required: true, description: 'Rows rendered in the table body' },
    ],
    variants: ['default'],
    accessibilityNotes: [
      'Uses semantic table, thead, tbody, th, and td elements',
      'Column headers are rendered as th elements',
      'Horizontal overflow keeps data usable on small screens',
    ],
    related: ['stat', 'pagination'],
  },

  timeline: {
    slug: 'timeline',
    name: 'Timeline',
    category: 'data',
    description: 'Vertical event timeline for activity feeds, release histories, and audit trails.',
    isNew: true,
    importStatement: `import { Timeline } from '@/components/forge'`,
    code: `import { Timeline } from '@/components/forge'

export default function Example() {
  return (
    <Timeline
      items={[
        { title: 'Component added', description: 'Table exported and documented.', time: '09:00' },
        { title: 'Preview wired', description: 'Live example added to docs.', time: '09:18' },
      ]}
    />
  )
}`,
    props: [
      { name: 'items', type: '{ title: React.ReactNode; description?: React.ReactNode; time?: React.ReactNode }[]', required: true, description: 'Timeline events rendered in order' },
    ],
    variants: ['default'],
    accessibilityNotes: [
      'Uses an ordered list to preserve event order',
      'Time values are rendered with time elements',
    ],
    related: ['table', 'stat'],
  },

  'avatar-group': {
    slug: 'avatar-group',
    name: 'Avatar Group',
    category: 'media',
    description: 'Stacked avatar cluster with overflow counter for teams, collaborators, and assignees.',
    isNew: true,
    importStatement: `import { AvatarGroup } from '@/components/forge'`,
    code: `import { AvatarGroup } from '@/components/forge'

export default function Example() {
  return (
    <AvatarGroup
      items={[
        { initials: 'AK', label: 'Anika' },
        { initials: 'JD', label: 'Jordan' },
        { initials: 'MS', label: 'Mira' },
        { initials: 'RP', label: 'Ravi' },
        { initials: 'TW', label: 'Taylor' },
      ]}
      max={4}
    />
  )
}`,
    props: [
      { name: 'items', type: '{ initials: string; label?: string }[]', required: true, description: 'People represented in the group' },
      { name: 'max', type: 'number', default: '4', description: 'Maximum avatars before overflow counter appears' },
    ],
    variants: ['default', 'overflow'],
    accessibilityNotes: [
      'Each visible avatar can expose a label through title',
      'Overflow count is rendered as readable text',
    ],
    related: ['avatar', 'badge'],
  },

  'range-slider': {
    slug: 'range-slider',
    name: 'Range Slider',
    category: 'form',
    description: 'Native range input styled with GridNest tokens for numeric settings and quick adjustments.',
    isNew: true,
    importStatement: `import { RangeSlider } from '@/components/forge'`,
    code: `import { RangeSlider } from '@/components/forge'

export default function Example() {
  return <RangeSlider label="Opacity" valueLabel="72%" defaultValue={72} />
}`,
    props: [
      { name: 'label', type: 'React.ReactNode', description: 'Visible slider label' },
      { name: 'valueLabel', type: 'React.ReactNode', description: 'Optional value display' },
      { name: 'min', type: 'number | string', default: '0', description: 'Minimum value' },
      { name: 'max', type: 'number | string', default: '100', description: 'Maximum value' },
    ],
    variants: ['default'],
    accessibilityNotes: [
      'Uses a native range input',
      'Label is linked to the slider by htmlFor',
    ],
    related: ['stepper', 'input'],
  },

  banner: {
    slug: 'banner',
    name: 'Banner',
    category: 'feedback',
    description: 'Prominent product message with icon, supporting copy, and action slot.',
    isNew: true,
    importStatement: `import { Banner, Button } from '@/components/forge'`,
    code: `import { Banner, Button } from '@/components/forge'

export default function Example() {
  return (
    <Banner
      title="New component batch available"
      description="Preview data, layout, and navigation components."
      action={<Button size="sm">Review</Button>}
    />
  )
}`,
    props: [
      { name: 'title', type: 'React.ReactNode', required: true, description: 'Primary banner message' },
      { name: 'description', type: 'React.ReactNode', description: 'Supporting message' },
      { name: 'action', type: 'React.ReactNode', description: 'Optional action slot' },
    ],
    variants: ['default'],
    accessibilityNotes: [
      'Keeps actions in normal tab order',
      'Message is text-first and does not rely on color alone',
    ],
    related: ['alert', 'button'],
  },

  toolbar: {
    slug: 'toolbar',
    name: 'Toolbar',
    category: 'command',
    description: 'Compact command surface for editor actions, filters, and grouped controls.',
    isNew: true,
    importStatement: `import { Toolbar, Button, Divider } from '@/components/forge'`,
    code: `import { Toolbar, Button, Divider } from '@/components/forge'

export default function Example() {
  return (
    <Toolbar>
      <Button size="sm" variant="ghost">Bold</Button>
      <Button size="sm" variant="ghost">Italic</Button>
      <Divider orientation="vertical" className="mx-1 h-6" />
      <Button size="sm" variant="secondary">Publish</Button>
    </Toolbar>
  )
}`,
    props: [
      { name: 'children', type: 'React.ReactNode', required: true, description: 'Toolbar controls' },
    ],
    variants: ['default'],
    accessibilityNotes: [
      'Uses role="toolbar"',
      'Child controls keep their native keyboard behavior',
    ],
    related: ['button', 'divider'],
  },

  tooltip: {
    slug: 'tooltip',
    name: 'Tooltip',
    category: 'overlay',
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
      { name: 'delayDuration', type: 'number', default: '120', description: 'Open delay in ms' },
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
