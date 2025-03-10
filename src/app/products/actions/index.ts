'use server'

import { revalidatePath } from 'next/cache'

import type { ProductType } from '../types'

import { createClient } from '@/utils/supabase/server'
import { logger } from '@/utils/logger'

export async function getProducts(): Promise<ProductType[]> {
  const supabase = await createClient()

  try {
    const { data, error } = await supabase.from('product').select('*, user:id_user (id, name)')

    if (error) throw new Error(error.message)

    logger('getProducts', data, 'info')

    return data || []
  } catch (error: any) {
    logger('getProducts', error, 'error')

    return []
  }
}

export async function addProduct(product: ProductType): Promise<ProductType | null> {
  const supabase = await createClient()

  try {
    const { data, error } = await supabase.from('product').insert([product]).select().single()

    if (error) throw new Error(error.message)

    logger('addProducts', data, 'info')

    revalidatePath('/master/products')

    return data
  } catch (error: any) {
    logger('addProduct', error, 'error')

    throw error
  }
}

export async function updateProduct(product: ProductType): Promise<ProductType | null> {
  const supabase = await createClient()

  try {
    const { data, error } = await supabase.from('product').update(product).eq('id', product.id).select().single()

    if (error) {
      throw new Error(error.message)
    }

    logger('updateProduct', data, 'info')

    revalidatePath('/master/products')

    return data
  } catch (error: any) {
    logger('updateProduct', error, 'error')

    throw error
  }
}

export async function deleteProducts(products: ProductType[]): Promise<boolean> {
  const supabase = await createClient()

  try {
    const { data, error } = await supabase
      .from('product')
      .delete()
      .in(
        'id',
        products.map(product => product.id)
      )

    if (error) throw new Error(error.message)

    logger('deleteProduct', data, 'info')

    revalidatePath('/master/products')

    return true
  } catch (error: any) {
    logger('deleteProducts', error, 'error')

    throw error
  }
}

export async function addOrder(id_product: string, id_customer: string): Promise<boolean> {
  const supabase = await createClient()

  try {
    
    const { data: product, error: productError } = await supabase
      .from('product')
      .select('id, stok')
      .eq('id', id_product)
      .single()

    if (productError) throw new Error(productError.message)
    if (!product) throw new Error('Product not found')

    
    if (product.stok <= 0) throw new Error('Product is out of stock')

    
    const { data: orderData, error: orderError } = await supabase.from('transaction_product').insert([
      { id_product, id_customer }
    ])

    if (orderError) throw new Error(orderError.message)

   
    const { error: updateError } = await supabase
      .from('product')
      .update({ stok: product.stok - 1 })
      .eq('id', id_product)

    if (updateError) throw new Error(updateError.message)

    logger('addOrder', orderData, 'info')

    revalidatePath('/products')

    return true
  } catch (error: any) {
    logger('addOrder', error, 'error')

    throw error
  }
}


export async function getProductDetailById(id: string): Promise<ProductType | null> {
  if (!id) return null

  const supabase = await createClient()

  try {
    const { data, error } = await supabase
      .from('product')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw new Error(error.message)

    return data
  } catch (error: any) {
    logger('getProductDetailById', error, 'error')
    return null
  }
}

