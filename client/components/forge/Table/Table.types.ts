import { TableHTMLAttributes } from 'react'

export interface TableColumn<T extends Record<string, unknown>> {
  key: keyof T
  header: string
  align?: 'left' | 'center' | 'right'
}

export interface TableProps<T extends Record<string, unknown>> extends TableHTMLAttributes<HTMLTableElement> {
  columns: TableColumn<T>[]
  rows: T[]
}
