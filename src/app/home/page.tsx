import { redirect } from 'next/navigation'

import { Box } from '@mui/material'

import { createClient } from '@/utils/supabase/server'
import HomeSlider from './components/HomeSlider'
import { getProductImages, getRandomProducts } from '../dashboard/product/actions'
import RecommendedProductSection from './components/RecommendedProductSection'

export default async function HomePage() {
  const supabase = await createClient()

  // 🔹 Get user data
  const { data, error } = await supabase.auth.getUser()
  const userId = data.user?.id ?? ''

  if (error || !data?.user) {
    redirect('/login')
  }

  const productImages = await getProductImages(3)
  const randomProducts = await getRandomProducts()

  return (
    <Box className='mb-16'>
      <HomeSlider productImages={productImages} />
      <RecommendedProductSection randomProducts={randomProducts} userId={userId} />
    </Box>
  )
}
