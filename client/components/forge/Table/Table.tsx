import { forwardRef } from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { TableProps } from './Table.types'

function TableInner<T extends Record<string, unknown>>(
  { className, columns, rows, ...props }: TableProps<T>,
  ref: React.ForwardedRef<HTMLTableElement>
) {
  return (
    <div className="w-full overflow-x-auto rounded-[var(--gridnest-radius-lg)] border border-[var(--gridnest-border)]">
      <table ref={ref} className={twMerge(clsx('w-full border-collapse bg-[var(--gridnest-surface)] text-sm', className))} {...props}>
        <thead className="bg-[var(--gridnest-surface-2)]">
          <tr>
            {columns.map((column) => (
              <th key={String(column.key)} className={clsx('px-4 py-3 text-xs font-semibold uppercase tracking-wider text-[var(--gridnest-text-muted)]', column.align === 'right' ? 'text-right' : column.align === 'center' ? 'text-center' : 'text-left')}>
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className="border-t border-[var(--gridnest-border)]">
              {columns.map((column) => (
                <td key={String(column.key)} className={clsx('px-4 py-3 text-[var(--gridnest-text-secondary)]', column.align === 'right' ? 'text-right' : column.align === 'center' ? 'text-center' : 'text-left')}>
                  {String(row[column.key] ?? '')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const Table = forwardRef(TableInner) as <T extends Record<string, unknown>>(
  props: TableProps<T> & { ref?: React.ForwardedRef<HTMLTableElement> }
) => React.ReactElement

export default Table
