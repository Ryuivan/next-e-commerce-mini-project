import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'
import { getTransactionsProduct } from './actions'
import Transaction from './component/Transaction'

export default async function ProductsPage() {
  const supabase = await createClient() // No need for `await` here

  const { data, error } = await supabase.auth.getUser()

  if (error || !data?.user) {
    redirect('/login')
  }

  // const userId = data.user.id
  // const userId = '5cf1c605-e10e-46b2-86d0-23ba4a367c1a'

  const products = await getTransactionsProduct()

  return <Transaction initialData={products || []} />
}
