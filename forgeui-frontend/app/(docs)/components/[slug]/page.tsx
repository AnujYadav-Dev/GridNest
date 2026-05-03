import { notFound } from 'next/navigation'
import Link from 'next/link'
import { componentRegistry } from '@/lib/componentRegistry'
import { PropsTable } from '@/components/docs/PropsTable'
import { CodeBlock } from '@/components/docs/CodeBlock'
import { ArrowLeft, BookOpen, Keyboard } from 'lucide-react'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return Object.keys(componentRegistry).map((slug) => ({ slug }))
}

export default async function ComponentDocPage({ params }: PageProps) {
  const { slug } = await params
  const doc = componentRegistry[slug]

  if (!doc) notFound()

  return (
    <div className="max-w-3xl">
      {/* Breadcrumb */}
      <div className="mb-8 flex items-center gap-2 text-xs text-[var(--forge-text-muted)]">
        <Link href="/components" className="flex items-center gap-1 hover:text-[var(--forge-text-secondary)] transition-colors">
          <ArrowLeft size={12} /> Components
        </Link>
        <span>/</span>
        <span className="text-[var(--forge-text-primary)]">{doc.name}</span>
      </div>

      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <h1 className="font-sans text-3xl font-bold text-[var(--forge-text-primary)] tracking-tight">
            {doc.name}
          </h1>
          {doc.isNew && (
            <span className="rounded-full bg-[var(--forge-accent)] px-2.5 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider">
              New
            </span>
          )}
          <span className="rounded-full border border-[var(--forge-border)] px-2.5 py-0.5 text-[10px] text-[var(--forge-text-muted)] font-mono uppercase">
            {doc.category}
          </span>
        </div>
        <p className="text-[var(--forge-text-secondary)] leading-relaxed max-w-xl mb-6">
          {doc.description}
        </p>

        {/* Import line */}
        <div className="flex items-center gap-3 rounded-[var(--forge-radius-md)] border border-[var(--forge-border)] bg-[var(--forge-surface)] px-4 py-3">
          <code className="flex-1 text-xs font-mono text-[var(--forge-text-secondary)]">
            {doc.importStatement}
          </code>
        </div>
      </div>

      {/* Code Example */}
      <section className="mb-12">
        <h2 className="font-sans text-lg font-semibold text-[var(--forge-text-primary)] mb-4">
          Code Example
        </h2>
        <div className="rounded-[var(--forge-radius-lg)] border border-[var(--forge-border)] overflow-hidden">
          <CodeBlock code={doc.code} />
        </div>
      </section>

      {/* Props Table */}
      <section className="mb-12">
        <h2 className="font-sans text-lg font-semibold text-[var(--forge-text-primary)] mb-4">
          Props
        </h2>
        <PropsTable props={doc.props} />
      </section>

      {/* Variants */}
      {doc.variants.length > 0 && (
        <section className="mb-12">
          <h2 className="font-sans text-lg font-semibold text-[var(--forge-text-primary)] mb-4">
            Variants
          </h2>
          <div className="flex flex-wrap gap-2">
            {doc.variants.map((v) => (
              <span
                key={v}
                className="rounded-[var(--forge-radius-sm)] border border-[var(--forge-border)] bg-[var(--forge-surface-2)] px-3 py-1.5 text-xs font-mono text-[var(--forge-text-secondary)]"
              >
                {v}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Accessibility */}
      <section className="mb-12">
        <h2 className="font-sans text-lg font-semibold text-[var(--forge-text-primary)] mb-4 flex items-center gap-2">
          <Keyboard size={16} className="text-[var(--forge-accent)]" />
          Accessibility
        </h2>
        <ul className="space-y-2">
          {doc.accessibilityNotes.map((note, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-[var(--forge-text-secondary)]">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--forge-accent)]" />
              {note}
            </li>
          ))}
        </ul>
      </section>

      {/* Related Components */}
      {doc.related.length > 0 && (
        <section className="mb-12">
          <h2 className="font-sans text-lg font-semibold text-[var(--forge-text-primary)] mb-4 flex items-center gap-2">
            <BookOpen size={16} className="text-[var(--forge-accent)]" />
            Related Components
          </h2>
          <div className="flex flex-wrap gap-3">
            {doc.related.map((relSlug) => {
              const relDoc = componentRegistry[relSlug]
              if (!relDoc) return null
              return (
                <Link
                  key={relSlug}
                  href={`/components/${relSlug}`}
                  className="flex items-center gap-2 rounded-[var(--forge-radius-md)] border border-[var(--forge-border)] bg-[var(--forge-surface)] px-4 py-2.5 text-sm text-[var(--forge-text-secondary)] hover:text-[var(--forge-text-primary)] hover:border-[var(--forge-border-hover)] transition-colors"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--forge-accent)]" />
                  {relDoc.name}
                </Link>
              )
            })}
          </div>
        </section>
      )}
    </div>
  )
}
