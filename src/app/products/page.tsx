import { Suspense } from 'react'

import { Skeleton, Grid2, Typography, Box } from '@mui/material'

import { getProducts } from '../dashboard/product/actions'
import ProductCard from './components/ProductCard'
import { createClient } from '@/utils/supabase/server'

const ProductPage = async () => {
  // 🔹 Get user data
  const supabase = await createClient()
  const { data } = await supabase.auth.getUser()
  const userId = data.user?.id ?? ''

  const products = await getProducts()

  return (
    <Box>
      <Typography className='font-bold text-2xl'>Shoes Products</Typography>

      <Grid2 container spacing={2} className='mt-6'>
        {products.map(product => (
          <Grid2
            key={product.id}
            size={{
              xs: 12,
              sm: 6,
              md: 4
            }}
          >
            <Suspense fallback={<Skeleton variant='rounded' animation='wave' width='100%' height={300} />}>
              <ProductCard product={product} userId={userId} />
            </Suspense>
          </Grid2>
        ))}
      </Grid2>
    </Box>
  )
}

export default ProductPage
