import { Suspense } from 'react'

import Link from 'next/link'

import { Box, Button, Grid2, Skeleton, Typography } from '@mui/material'

import type { ProductType } from '@/app/dashboard/product/types'
import ProductCard from '@/app/products/components/ProductCard'

type RecommendedProductSectionProps = {
  randomProducts: ProductType[]
  userId?: string
}

const RecommendedProductSection = ({ randomProducts, userId }: RecommendedProductSectionProps) => {
  return (
    <Box className='w-full'>
      <Box className='my-10'>
        <Typography className='text-center font-bold text-3xl text-primary'>Recommended for you</Typography>
      </Box>

      <Grid2 container spacing={2}>
        {randomProducts.map(product => (
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

      <Box className='w-full flex justify-center items-center'>
        <Link href='/products'>
          <Button variant='contained' color='primary' className='mt-10' size='large'>
            See more
          </Button>
        </Link>
      </Box>
    </Box>
  )
}

export default RecommendedProductSection
