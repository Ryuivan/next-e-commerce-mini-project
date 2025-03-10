'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Box, Skeleton, Button } from '@mui/material'

import type { ProductType } from '../types'
import columns from '../columns'
import DataTableRowSelection from './OrderTable'

type ProductsProps = {
  initialData: ProductType[]
}

export default function Products({ initialData }: ProductsProps) {
  const [products, setProducts] = useState<ProductType[]>(initialData)
  const router = useRouter()

  const handleDetailClick = (id?: string | null) => {
    if (id) {
      router.push(`/products/${id}`)
    } else {
      console.error('Invalid product ID')
    }
  }

  return (
    <div>
      {!products ? (
        <Box>
          <Skeleton variant='rectangular' width='100%' height={50} />
          <Skeleton variant='rectangular' width='100%' height={50} sx={{ mt: 2 }} />
          <Skeleton variant='rectangular' width='100%' height={50} sx={{ mt: 2 }} />
        </Box>
      ) : (
        <>
          <DataTableRowSelection
            data={products}
            dynamicColumns={[
              ...columns,
              {
                id: 'actions',
                header: 'Actions',
                cell: ({ row }) => {
                  const productId = row.original.id
                  return (
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      disabled={!productId} 
                      onClick={() => handleDetailClick(productId)}
                    >
                      View Details
                    </Button>
                  )
                }
              }
            ]}
            tableName='Products Table'
          />
        </>
      )}
    </div>
  )
}
