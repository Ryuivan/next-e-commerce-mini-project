import { Box, Grid2, Typography } from '@mui/material'

import ProductCard from './ProductCard'
import { getFilteredProducts } from '@/app/dashboard/product/actions'
import PaginationControls from './PaginationControls'

type ProductSectionProps = {
  userId?: string
  productQuery: string
  currentPage: number
  perPage?: number
}

const ProductSection = async ({ currentPage, productQuery, userId, perPage = 6 }: ProductSectionProps) => {
  const { products, totalPages } = await getFilteredProducts(productQuery, currentPage, perPage)

  return (
    <Box>
      <Grid2 container spacing={2} className='mt-6'>
        {products.length > 0 ? (
          products.map(product => (
            <Grid2
              key={product.id}
              size={{
                xs: 12,
                sm: 6,
                md: 4
              }}
            >
              <ProductCard product={product} userId={userId} />
            </Grid2>
          ))
        ) : (
          <Box className='w-full mt-6'>
            <Typography className='text-center text-2xl font-semibold text-secondary'>No products found</Typography>
          </Box>
        )}
      </Grid2>
      <Box className='flex justify-center mt-10'>
        <PaginationControls totalPages={totalPages} />
      </Box>
    </Box>
  )
}

export default ProductSection
