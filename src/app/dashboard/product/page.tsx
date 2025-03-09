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

  const products = await getProducts()

  return <DashboardProduct initialData={products || []}  userId={data.user.id}/>
}

export default DashboardProductPage
