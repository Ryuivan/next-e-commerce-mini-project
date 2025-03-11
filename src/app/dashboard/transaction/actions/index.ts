'use server'

import { revalidatePath } from 'next/cache'

import type { TransactionType } from '../type'

import { createClient } from '@/utils/supabase/server'
import { logger } from '@/utils/logger'

export async function getTransactionsProduct(): Promise<TransactionType[]> {
  const supabase = await createClient()

  try {
    const { data, error } = await supabase
      .from('transaction_product')
      .select('*, user:id_customer (id, name, email), product:id_product(id, name, price, image_Url)')
      .order('created_at', { ascending: false })

    if (error) throw new Error(error.message)
    logger('getTransactionsProduct', data, 'info')
    return data || []
  } catch (error: any) {
    logger('getTransactionsProduct', error, 'error')

    return []
  }
}
