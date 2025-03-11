import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'
import { getProducts } from './actions'
import DashboardProduct from './components/DashboardProduct'

const DashboardProductPage = async () => {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()

  if (error || !data?.user) {
    redirect('/login')
  }

  // const id_user = '5cf1c605-e10e-46b2-86d0-23ba4a367c1a'

  const products = await getProducts()

  return <DashboardProduct initialData={products || []} userId={data.user.id} />
}

export default DashboardProductPage
