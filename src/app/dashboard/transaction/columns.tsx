import { createColumnHelper } from '@tanstack/react-table'
import { format, parseISO } from 'date-fns'
import React from 'react'

import type { TransactionType } from './type'
import { caseInsensitiveSort } from '../../../utils/sorting'

const columnHelper = createColumnHelper<TransactionType>()

const columns = [
  columnHelper.accessor('product.image_Url', {
    cell: info => {
      const url = info.getValue()
      return url ? <img src={url} alt='Product' className='h-10 w-10 object-cover' /> : '-'
    },
    header: 'Image'
  }),
  columnHelper.accessor('product.name', {
    cell: info => info.getValue() || '-',
    header: 'Product Name',
    enableSorting: true,
    sortingFn: caseInsensitiveSort
  }),
  columnHelper.accessor('product.price', {
    cell: info => {
      const price = info.getValue()
      return price ? new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(price) : '-'
    },
    header: 'Product Price',
    enableSorting: true
  }),
  columnHelper.accessor('created_at', {
    cell: info => {
      const value = info.getValue()
      return value ? format(parseISO(value), 'yyyy-MM-dd HH:mm:ss') : '-'
    },
    header: 'Transaction Time',
    enableSorting: true,
    sortingFn: 'datetime'
  }),
  columnHelper.accessor('user.name', {
    cell: info => info.getValue() || '-',
    header: 'Order By',
    enableSorting: true
  }),
  columnHelper.accessor('user.email', {
    cell: info => info.getValue() || '-',
    header: 'User Email',
    enableSorting: true
  })
]

export default columns
