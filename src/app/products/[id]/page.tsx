'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import type { ProductType } from '../types'
import { CircularProgress, Button } from '@mui/material'
import { getProductDetailById } from '../actions'

export default function ProductDetailPage() {
    const [product, setProduct] = useState<ProductType | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
  
    const router = useRouter()
    const { id } = useParams() as { id: string } 
  
    useEffect(() => {
      const fetchProduct = async () => {
        if (!id) return
  
        const data = await getProductDetailById(id)
  
        if (!data) {
          setError('Failed to fetch product details')
        } else {
          setProduct(data)
        }
        setLoading(false)
      }
  
      fetchProduct()
    }, [id])
  
    if (loading) return <CircularProgress />
    if (error) return <p className="text-red-500">{error}</p>
  
   
    const formatDate = (dateString: string | null | undefined) => {
      if (!dateString) return 'N/A'
      return new Date(dateString).toLocaleDateString('en-GB') // Formats as DD/MM/YYYY
    }
  
    return (
      <div className="p-6">
        <Button variant="contained" color="primary" onClick={() => router.back()}>
          Go Back
        </Button>
        <h1 className="text-2xl font-bold mt-4">{product?.name}</h1>
        {product?.image_Url && (
          <img src={product.image_Url} alt={product.name} className="w-64 h-64 object-cover mt-4" />
        )}
        <p className="text-white mt-2">{product?.description}</p>
        <p className="font-semibold mt-2">Status: {product?.stok}</p>
        <p className="font-semibold mt-2">Price: ${product?.price}</p>
        <p className="text-sm text-white mt-2">Created At: {formatDate(product?.created_at)}</p>
        <p className="text-sm text-white">Updated At: {formatDate(product?.updated_at)}</p>
      </div>
    )
  }
