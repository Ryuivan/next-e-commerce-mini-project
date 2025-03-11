'use server'

import { revalidatePath } from 'next/cache'

import type { TransactionType } from '../types'

import { createClient } from '@/utils/supabase/server'
import { logger } from '@/utils/logger'

export async function getTransactionsByCustomer(customerId: string): Promise<TransactionType[]> {
  const supabase = await createClient()

  try {
    const { data, error } = await supabase
      .from('transaction_product')
      .select('*, user:id_customer (id, name), product:id_product(id, name, price, image_Url)')
      .eq('id_customer', customerId) // Filter by customer ID

    if (error) throw new Error(error.message)

    logger('getTransactionsByCustomer', data, 'info')

    return data || []
  } catch (error: any) {
    logger('getTransactionsByCustomer', error, 'error')

    return []
  }
}
