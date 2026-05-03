import { HTMLAttributes } from 'react'

export interface PaginationProps extends HTMLAttributes<HTMLDivElement> {
  page: number
  totalPages: number
  onPageChange?: (page: number) => void
}
