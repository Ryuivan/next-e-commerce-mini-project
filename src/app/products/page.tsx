import { Typography, Box, Pagination } from '@mui/material'

import { createClient } from '@/utils/supabase/server'
import ProductSearch from './components/ProductSearch'
import ProductSection from './components/ProductSection'

type ProductPageProps = {
  searchParams?: Promise<{
    product?: string
    page?: string
  }>
}

const ProductPage = async (props: ProductPageProps) => {
  // 🔹 Get user data
  const supabase = await createClient()
  const { data } = await supabase.auth.getUser()
  const userId = data.user?.id ?? ''

  const searchParams = await props.searchParams
  const productQuery = searchParams?.product || ''
  const currentPage = Number(searchParams?.page) || 1

  return (
    <Box>
      <Typography className='font-bold text-3xl text-primary'>Shoes Products</Typography>

      <Box className='mt-6'>
        <ProductSearch />
      </Box>

      <ProductSection currentPage={currentPage} productQuery={productQuery} userId={userId} />

    </Box>
  )
}

export default ProductPage
