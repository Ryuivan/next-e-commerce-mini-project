'use server'

import { revalidatePath } from 'next/cache'

import { logger } from '@/utils/logger'

import { createClient } from '@/utils/supabase/server'
import type { ProductType } from '../types'

export const getProducts = async (): Promise<ProductType[]> => {
  const supabase = await createClient()

  try {
    const { data, error } = await supabase.from('product').select('*')

    if (error) throw new Error(error.message)

    logger('getProducts', data, 'info')

    return data || []
  } catch (error: any) {
    logger('getProducts', error, 'error')

    return []
  }
}

export const getProductImages = async (limit?: number): Promise<string[]> => {
  const supabase = await createClient()

  try {
    const { data, error } = await supabase.from('product').select('image_Url')

    if (error) throw new Error(error.message)

    logger('getProductImages', data, 'info')

    if (limit) return data.slice(0, limit).map((product: { image_Url: string }) => product.image_Url ?? '')

    return data.map((product: { image_Url: string }) => product.image_Url ?? '') || []
  } catch (error: any) {
    logger('getProductImages', error, 'error')

    return []
  }
}

export const getRandomProducts = async (): Promise<ProductType[]> => {
  const supabase = await createClient()

  try {
    const { data, error } = await supabase.rpc('get_random_products')

    if (error) throw new Error(error.message)

    logger('getRandomProducts', data, 'info')

    return data || []
  } catch (error: any) {
    logger('getRandomProducts', error, 'error')

    return []
  }
}

export const addProduct = async (product: ProductType): Promise<ProductType | null> => {
  const supabase = await createClient()

  try {
    const { data, error } = await supabase.from('product').insert([product]).select().single()

    if (error) throw new Error(error.message)
    logger('addLocation', data, 'info')

    revalidatePath('/dashboard/product')

    return data
  } catch (error: any) {
    logger('addLocation', error, 'error')
    throw error
  }
}

export const updateProduct = async (product: ProductType): Promise<ProductType | null> => {
  const supabase = await createClient()

  try {
    const { data, error } = await supabase
      .from('product')
      .update({
        name: product.name,
        description: product.description,
        price: product.price,
        image_Url: product.image_Url,
        stok: product.stok
      })
      .eq('id', product.id)
      .select()
      .single()

    if (error) throw new Error(error.message)

    logger('updateProduct', data, 'info')

    revalidatePath('/dashboard/products')

    return data
  } catch (error: any) {
    logger('updateProduct', error, 'error')
    throw error
  }
}

export const deleteProducts = async (products: ProductType[]): Promise<boolean> => {
  const supabase = await createClient()

  try {
    const { data, error } = await supabase
      .from('product')
      .delete()
      .in(
        'id',
        products.map(products => products.id)
      )

    if (error) throw new Error(error.message)

    logger('deleteProducts', data, 'info')

    revalidatePath('/dashboard/products')

    return true
  } catch (error: any) {
    logger('deleteProducts', error, 'error')
    throw error
  }
}
