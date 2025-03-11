import { redirect } from 'next/navigation'

<<<<<<< HEAD
import { createClient } from '@/utils/supabase/server'

=======
import { Box } from '@mui/material'

import { createClient } from '@/utils/supabase/server'
import HomeSlider from './components/HomeSlider'
import { getProductImages, getRandomProducts } from '../dashboard/product/actions'
import RecommendedProductSection from './components/RecommendedProductSection'
>>>>>>> upstream/main

export default async function HomePage() {
  const supabase = await createClient()

<<<<<<< HEAD
  const { data, error } = await supabase.auth.getUser()
=======
  // 🔹 Get user data
  const { data, error } = await supabase.auth.getUser()
  const userId = data.user?.id ?? ''
>>>>>>> upstream/main

  if (error || !data?.user) {
    redirect('/login')
  }

<<<<<<< HEAD
  
  return (
    <div className="flex justify-center items-center h-screen text-2xl font-bold">
      This is a home page
    </div>
  )

=======
  const productImages = await getProductImages(3)
  const randomProducts = await getRandomProducts()

  return (
    <Box className='mb-16'>
      <HomeSlider productImages={productImages} />
      <RecommendedProductSection randomProducts={randomProducts} userId={userId} />
    </Box>
  )
>>>>>>> upstream/main
}
