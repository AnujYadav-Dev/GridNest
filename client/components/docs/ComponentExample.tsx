'use client'

import { useState } from 'react'
import { Mail, Search, SlidersHorizontal } from 'lucide-react'
import {
  Accordion,
  Alert,
  Avatar,
  AvatarGroup,
  Badge,
  Banner,
  Breadcrumb,
  Button,
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  Checkbox,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownLabel,
  DropdownSeparator,
  EmptyState,
  Input,
  Kbd,
  Modal,
  Pagination,
  Progress,
  RangeSlider,
  RadioGroup,
  Select,
  Skeleton,
  Spinner,
  Stat,
  Stepper,
  Tabs,
  Table,
  Timeline,
  Textarea,
  Toolbar,
  Toast,
  Toggle,
  Tooltip,
  TooltipProvider,
} from '@/components/forge'

interface ComponentExampleProps {
  slug: string
}

const accordionItems = [
  { value: 'system', trigger: 'What is GridNest?', content: 'A production-grade design system for fast product interfaces.' },
  { value: 'motion', trigger: 'Does it include motion?', content: 'Yes. Components use shared timing and accessible reduced-motion behavior.' },
  { value: 'tokens', trigger: 'Can I customize it?', content: 'Tokens control color, radius, shadow, spacing, and animation values.' },
]

const tabs = [
  { value: 'overview', label: 'Overview', content: <p className="text-sm text-[var(--gridnest-text-secondary)]">Compose pages from accessible primitives.</p> },
  { value: 'code', label: 'Code', content: <p className="text-sm text-[var(--gridnest-text-secondary)]">Copy the examples and adapt the tokens.</p> },
  { value: 'props', label: 'Props', content: <p className="text-sm text-[var(--gridnest-text-secondary)]">Typed props keep the API predictable.</p> },
]

export function ComponentExample({ slug }: ComponentExampleProps) {
  const [modalOpen, setModalOpen] = useState(false)
  const [page, setPage] = useState(2)
  const [togglePressed, setTogglePressed] = useState(true)

  switch (slug) {
    case 'button':
      return (
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Danger</Button>
          <Button loading>Loading</Button>
        </div>
      )
    case 'badge':
      return (
        <div className="flex flex-wrap items-center justify-center gap-2">
          <Badge>Default</Badge>
          <Badge variant="success" showDot>Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="danger">Danger</Badge>
          <Badge variant="success" live>Live</Badge>
        </div>
      )
    case 'avatar':
      return (
        <div className="flex items-center justify-center gap-4">
          <Avatar initials="JD" size="sm" />
          <Avatar initials="AK" size="md" status="online" />
          <Avatar initials="FG" size="lg" status="away" />
          <Avatar initials="UI" size="xl" status="busy" />
        </div>
      )
    case 'avatar-group':
      return (
        <AvatarGroup
          items={[
            { initials: 'AK', label: 'Anika' },
            { initials: 'JD', label: 'Jordan' },
            { initials: 'MS', label: 'Mira' },
            { initials: 'RP', label: 'Ravi' },
            { initials: 'TW', label: 'Taylor' },
            { initials: 'NG', label: 'Nora' },
          ]}
          max={4}
        />
      )
    case 'input':
      return (
        <div className="flex w-full max-w-sm flex-col gap-4">
          <Input label="Email" placeholder="you@example.com" type="email" iconLeft={<Mail size={14} />} />
          <Input label="Search" placeholder="Search components..." iconLeft={<Search size={14} />} helperText="Try button, modal, or tabs" />
          <Input label="Username" placeholder="gridnest" error="This username is taken" />
        </div>
      )
    case 'checkbox':
      return (
        <div className="flex w-full max-w-sm flex-col gap-4">
          <Checkbox label="Enable motion" description="Use tasteful transitions across the interface." defaultChecked />
          <Checkbox label="Send release notes" description="Notify me when new components ship." />
          <Checkbox label="Locked setting" description="This option is disabled." disabled />
        </div>
      )
    case 'select':
      return (
        <div className="w-full max-w-sm">
          <Select
            label="Component category"
            helperText="Native select with GridNest styling."
            defaultValue="feedback"
            options={[
              { value: 'form', label: 'Form' },
              { value: 'display', label: 'Display' },
              { value: 'feedback', label: 'Feedback' },
              { value: 'navigation', label: 'Navigation' },
            ]}
          />
        </div>
      )
    case 'textarea':
      return (
        <div className="w-full max-w-sm">
          <Textarea label="Release notes" helperText="Resize the field if you need more room." defaultValue="Added a new component batch for GridNest." />
        </div>
      )
    case 'radio-group':
      return (
        <RadioGroup
          name="density"
          defaultValue="comfortable"
          options={[
            { value: 'compact', label: 'Compact', description: 'Higher information density.' },
            { value: 'comfortable', label: 'Comfortable', description: 'Balanced spacing for dashboards.' },
            { value: 'spacious', label: 'Spacious', description: 'More breathing room.' },
          ]}
        />
      )
    case 'stepper':
      return <Stepper defaultValue={4} min={0} max={10} />
    case 'range-slider':
      return (
        <div className="w-full max-w-sm">
          <RangeSlider label="Opacity" valueLabel="72%" defaultValue={72} />
        </div>
      )
    case 'modal':
      return (
        <>
          <Button onClick={() => setModalOpen(true)}>Open modal</Button>
          <Modal
            open={modalOpen}
            onOpenChange={setModalOpen}
            title="Confirm action"
            description="This is a live modal preview using the Forge UI component."
            footer={
              <>
                <Button variant="ghost" onClick={() => setModalOpen(false)}>Cancel</Button>
                <Button onClick={() => setModalOpen(false)}>Continue</Button>
              </>
            }
          >
            <p className="text-sm text-[var(--gridnest-text-secondary)]">
              The dialog uses Radix focus management and Framer Motion transitions.
            </p>
          </Modal>
        </>
      )
    case 'toast':
      return (
        <div className="w-full max-w-sm">
          <Toast title="Saved" description="Your component preference was updated." variant="success" duration={0} />
        </div>
      )
    case 'card':
      return (
        <div className="grid w-full max-w-lg grid-cols-1 gap-4 sm:grid-cols-2">
          <Card variant="bordered">
            <CardHeader>
              <CardTitle>Default Card</CardTitle>
              <CardDescription>Structured content container.</CardDescription>
            </CardHeader>
          </Card>
          <Card variant="elevated" interactive>
            <CardHeader>
              <CardTitle>Interactive</CardTitle>
              <CardDescription>Hover and tap feedback.</CardDescription>
            </CardHeader>
          </Card>
        </div>
      )
    case 'alert':
      return (
        <div className="flex w-full max-w-md flex-col gap-3">
          <Alert title="Component saved">Your changes are ready to reuse.</Alert>
          <Alert variant="success" title="Published">The design token export completed.</Alert>
          <Alert variant="warning" title="Review needed">One prop value may need attention.</Alert>
        </div>
      )
    case 'banner':
      return (
        <Banner
          title="New component batch available"
          description="Preview data, layout, and navigation components in the library."
          action={<Button size="sm">Review</Button>}
          className="w-full max-w-xl"
        />
      )
    case 'tabs':
      return <Tabs tabs={tabs} defaultValue="overview" className="w-full max-w-md" />
    case 'accordion':
      return <Accordion items={accordionItems} defaultValue="system" className="w-full max-w-md" />
    case 'dropdown':
      return (
        <Dropdown trigger={<Button variant="secondary">Options</Button>}>
          <DropdownLabel>Actions</DropdownLabel>
          <DropdownItem>Edit component</DropdownItem>
          <DropdownItem>Duplicate</DropdownItem>
          <DropdownSeparator />
          <DropdownItem className="text-[var(--gridnest-danger)]">Delete</DropdownItem>
        </Dropdown>
      )
    case 'breadcrumb':
      return (
        <Breadcrumb
          items={[
            { label: 'Components', href: '/components' },
            { label: 'Navigation', href: '/components?category=navigation' },
            { label: 'Breadcrumb' },
          ]}
        />
      )
    case 'pagination':
      return <Pagination page={page} totalPages={5} onPageChange={setPage} />
    case 'toolbar':
      return (
        <Toolbar>
          <Button size="sm" variant="ghost">Bold</Button>
          <Button size="sm" variant="ghost">Italic</Button>
          <Divider orientation="vertical" className="mx-1 h-6" />
          <Button size="sm" variant="secondary">Publish</Button>
        </Toolbar>
      )
    case 'toggle':
      return (
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Toggle pressed={togglePressed} onPressedChange={setTogglePressed}>Preview</Toggle>
          <Toggle variant="outline" size="sm" pressed><SlidersHorizontal size={14} /></Toggle>
          <Toggle variant="outline" disabled>Disabled</Toggle>
        </div>
      )
    case 'skeleton':
      return (
        <div className="flex w-full max-w-sm flex-col gap-3">
          <div className="flex items-center gap-3">
            <Skeleton variant="circle" className="h-10 w-10" />
            <div className="flex flex-1 flex-col gap-2">
              <Skeleton variant="text" className="w-3/4" />
              <Skeleton variant="text" className="w-1/2" />
            </div>
          </div>
          <Skeleton variant="rectangle" className="h-28" />
        </div>
      )
    case 'progress':
      return (
        <div className="flex w-full max-w-sm flex-col gap-4">
          <Progress value={65} />
          <Progress value={38} variant="success" />
          <Progress value={78} variant="warning" />
          <Progress />
        </div>
      )
    case 'spinner':
      return (
        <div className="flex items-center gap-5">
          <Spinner size="sm" />
          <Spinner />
          <Spinner size="lg" />
        </div>
      )
    case 'empty-state':
      return (
        <EmptyState
          title="No saved components"
          description="Start by browsing the library and saving the patterns you use most."
          action={<Button size="sm">Browse components</Button>}
          className="w-full max-w-md"
        />
      )
    case 'stat':
      return (
        <div className="grid w-full max-w-lg grid-cols-1 gap-3 sm:grid-cols-3">
          <Stat label="Components" value="27" change="+10 added" trend="up" />
          <Stat label="Coverage" value="94%" change="Stable" />
          <Stat label="Issues" value="2" change="-3 fixed" trend="up" />
        </div>
      )
    case 'table':
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
            { component: 'Timeline', category: 'Data', status: 'New' },
          ]}
        />
      )
    case 'timeline':
      return (
        <Timeline
          items={[
            { title: 'Component added', description: 'Table component exported and documented.', time: '09:00' },
            { title: 'Preview wired', description: 'Live example added to docs.', time: '09:18' },
            { title: 'Build passed', description: 'Static routes generated successfully.', time: '09:31' },
          ]}
          className="w-full max-w-md"
        />
      )
    case 'divider':
      return (
        <div className="flex w-full max-w-md flex-col gap-5 text-sm text-[var(--gridnest-text-secondary)]">
          <p>Account details</p>
          <Divider label="or continue with" />
          <p>Team workspace</p>
        </div>
      )
    case 'kbd':
      return (
        <div className="flex flex-wrap items-center gap-2 text-sm text-[var(--gridnest-text-secondary)]">
          <Kbd>Ctrl</Kbd>
          <Kbd>K</Kbd>
          <span>Open command menu</span>
          <Kbd size="sm">Esc</Kbd>
        </div>
      )
    case 'tooltip':
      return (
        <TooltipProvider>
          <Tooltip content="This tooltip is rendered from the live preview">
            <Button variant="secondary">Hover or focus me</Button>
          </Tooltip>
        </TooltipProvider>
      )
    default:
      return <p className="text-sm text-[var(--gridnest-text-secondary)]">Preview coming soon.</p>
  }
}
