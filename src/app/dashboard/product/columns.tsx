import Image from 'next/image'

import { createColumnHelper } from '@tanstack/react-table'
import { format, parseISO } from 'date-fns'

import type { ProductType } from './types'
import { caseInsensitiveSort, numericSort } from '@/utils/sorting'

const columnHelper = createColumnHelper<ProductType>()

const columns = [
  columnHelper.accessor('name', {
    cell: info => info.getValue(),
    header: 'Name',
    enableSorting: true,
    sortingFn: caseInsensitiveSort
  }),
  columnHelper.accessor('image_Url', {
    cell: ({ getValue }) => {
      const imageUrl = getValue() as string

      return (
        <div className='flex items-center justify-center'>
          <Image
            src={imageUrl}
            alt='Product Image'
            width={48}
            height={48}
            className='h-12 w-12 object-cover rounded-md border border-gray-200'
          />
        </div>
      )
    },
    header: 'Image',
    enableSorting: true,
    sortingFn: caseInsensitiveSort
  }),

  columnHelper.accessor('price', {
    cell: info => info.getValue(),
    header: 'Price',
    enableSorting: true,
    sortingFn: numericSort
  }),
  columnHelper.accessor('stok', {
    cell: info => info.getValue(),
    header: 'Stok',
    enableSorting: true,
    sortingFn: numericSort
  }),

  // columnHelper.accessor('id_user', {
  //   cell: info => info.getValue(),
  //   header: 'Added by',
  //   enableSorting: true,
  //   sortingFn: caseInsensitiveSort
  // }),
  columnHelper.accessor('description', {
    cell: info => info.getValue(),
    header: 'Description',
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
