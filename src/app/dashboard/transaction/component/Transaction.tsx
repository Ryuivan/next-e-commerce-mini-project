'use client'

import { useState, useEffect } from 'react'
import { Box, Skeleton } from '@mui/material'

import type { TransactionType } from '../type'
import columns from '../columns'
import DataTableRowSelection from './TransactionTable'
import { createClient } from '@/utils/supabase/client'
import OrderTable from './TransactionTable'

type ProductsProps = {
  initialData: TransactionType[]
}

export default function Transaction({ initialData }: ProductsProps) {
  const [products, setProducts] = useState<TransactionType[]>(initialData)
  // const [userName, setUserName] = useState<string | null>(null)

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     const supabase = createClient()
  //     const { data, error } = await supabase.auth.getUser()
  //     if (data?.user) {
  //       setUserName(data.user.user_metadata?.full_name || 'User')
  //     }
  //   }
  //   fetchUser()
  // }, [])

  return (
    <div>
      {!products ? (
        <Box>
          <Skeleton variant='rectangular' width='100%' height={50} />
          <Skeleton variant='rectangular' width='100%' height={50} sx={{ mt: 2 }} />
          <Skeleton variant='rectangular' width='100%' height={50} sx={{ mt: 2 }} />
        </Box>
      ) : (
        <OrderTable data={products} dynamicColumns={columns} tableName={`Transaction History Table`} />
      )}
    </div>
  )
}
