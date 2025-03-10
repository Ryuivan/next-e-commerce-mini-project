import { createColumnHelper } from '@tanstack/react-table'
import { format, parseISO } from 'date-fns'

import type { ProductType } from './types'
import { caseInsensitiveSort } from '@/utils/sorting'

const columnHelper = createColumnHelper<ProductType>()

const columns = [
  columnHelper.accessor('name', {
    cell: info => info.getValue(),
    header: 'Name',
    enableSorting: true,
    sortingFn: caseInsensitiveSort
  }),
  columnHelper.accessor('stok', {
    cell: info => info.getValue(),
    header: 'Stock',
    enableSorting: true
  }),
  columnHelper.accessor('price', {
    cell: info => `$${info.getValue()}`,
    header: 'Price',
    enableSorting: true
  }),
  columnHelper.accessor('image_Url', {
    cell: info => {
      const url = info.getValue()
      return url ? <img src={url} alt="Product" className="h-10 w-10 object-cover" /> : '-'
    },
    header: 'Image'
  }),
  columnHelper.accessor('user.name', {
    cell: info => info.getValue(),
    header: 'User',
    enableSorting: true,
    sortingFn: caseInsensitiveSort
  }),
  columnHelper.accessor('created_at', {
    cell: info => {
      const value = info.getValue()
      return value ? format(parseISO(value), 'yyyy-MM-dd HH:mm:ss') : '-'
    },
    header: 'Created At',
    enableSorting: true,
    sortingFn: 'datetime'
  }),
  columnHelper.accessor('updated_at', {
    cell: info => {
      const value = info.getValue()
      return value ? format(parseISO(value), 'yyyy-MM-dd HH:mm:ss') : '-'
    },
    header: 'Updated At',
    enableSorting: true,
    sortingFn: 'datetime'
  })
]

export default columns
