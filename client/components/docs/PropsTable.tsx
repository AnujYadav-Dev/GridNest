import { PropDef } from '@/types/component.types'

interface PropsTableProps {
  props: PropDef[]
}

export function PropsTable({ props }: PropsTableProps) {
  if (props.length === 0) return null

  return (
    <div className="overflow-x-auto rounded-[var(--gridnest-radius-lg)] border border-[var(--gridnest-border)]">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-[var(--gridnest-border)] bg-[var(--gridnest-surface)]">
            {['Prop', 'Type', 'Default', 'Required', 'Description'].map((h) => (
              <th
                key={h}
                className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[var(--gridnest-text-muted)]"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {props.map((prop, i) => (
            <tr
              key={prop.name}
              className={`border-b border-[var(--gridnest-border)] last:border-0 ${i % 2 === 0 ? 'bg-[var(--gridnest-bg)]' : 'bg-[var(--gridnest-surface)]'
                }`}
            >
              <td className="px-4 py-3">
                <code className="rounded px-1.5 py-0.5 text-xs bg-[var(--gridnest-surface-2)] text-[var(--gridnest-accent)] font-mono">
                  {prop.name}
                </code>
              </td>
              <td className="px-4 py-3">
                <code className="text-xs text-[var(--gridnest-text-secondary)] font-mono">{prop.type}</code>
              </td>
              <td className="px-4 py-3">
                {prop.default ? (
                  <code className="text-xs text-[var(--gridnest-text-muted)] font-mono">{prop.default}</code>
                ) : (
                  <span className="text-[var(--gridnest-text-muted)]">-</span>
                )}
              </td>
              <td className="px-4 py-3">
                {prop.required ? (
                  <span className="inline-flex items-center rounded-full bg-[var(--gridnest-danger)]/10 px-2 py-0.5 text-[10px] font-medium text-[var(--gridnest-danger)]">
                    Yes
                  </span>
                ) : (
                  <span className="text-xs text-[var(--gridnest-text-muted)]">No</span>
                )}
              </td>
              <td className="px-4 py-3 text-[var(--gridnest-text-secondary)]">{prop.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
