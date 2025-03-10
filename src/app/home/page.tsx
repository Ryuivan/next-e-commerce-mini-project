import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'


export default async function HomePage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()

  if (error || !data?.user) {
    redirect('/login')
  }

  
  return (
    <div className="flex justify-center items-center h-screen text-2xl font-bold">
      This is a home page
    </div>
  )

}
