'use client'

import type { MouseEvent } from 'react'

import Image from 'next/image'

import { Box, Button, Stack, Typography } from '@mui/material'

import type { ProductType } from '@/app/dashboard/product/types'
import { addOrder } from '../actions'
import { logger } from '@/utils/logger'
import { ToastError } from '@/utils/toastError'
import { ToastSuccess } from '@/utils/ToastSucces'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

type ProductDetailProps = {
  product: ProductType | null
  userId?: string
}

const ProductDetail = ({ product, userId }: ProductDetailProps) => {
  if (!product) return null

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR'
    }).format(price)
  }

  const handleAddToCart = async (event: MouseEvent<HTMLButtonElement>, productId: string) => {
    event.stopPropagation()

    try {
      if (!userId) throw new Error('User ID is not found')

      const result = await addOrder(productId, userId)

      if (!result) {
        ToastError('Out Of Stock')
      } else {
        ToastSuccess('Order added successfully!')
      }

      logger('Add to cart clicked', 'success', 'info')
    } catch (error: any) {
      logger('Add to cart clicked', error, 'error')
    }
  }

  return (
    <Box className='w-full h-full flex flex-col md:flex-row items-center justify-center p-4'>
      <Stack
        direction={{ xs: 'column', md: 'row' }} // Kolom di layar kecil, baris di layar besar
        justifyContent='center'
        className='max-w-3xl w-full space-y-4 md:space-y-0 md:space-x-10'
      >
        {/* Gambar */}
        <Box className='w-full md:w-auto flex justify-center'>
          <Image
            src={product.image_Url}
            alt={product.name}
            width={300}
            height={300}
            className='shadow-md w-full md:w-[300px] h-auto'
          />
        </Box>

        {/* Teks Produk */}
        <Box className='w-full text-center md:text-left'>
          <Stack spacing={2} direction='column'>
            {/* Nama Produk */}
            <Box>
              <Typography className='font-bold text-2xl text-primary'>{product.name}</Typography>
            </Box>

            {/* Harga */}
            <Box>
              <Typography className='font-bold text-lg'>{formatPrice(product.price)}</Typography>
            </Box>

            {/* Stok */}
            <Box>
              <Typography className='font-bold text-md text-secondary'>Stock Product: {product.stok}</Typography>
            </Box>

            {/* Deskripsi */}
            <Box>
              <Typography className='font-normal text-base text-secondary text-justify'>
                {product.description}
              </Typography>
            </Box>

            {/* Tombol Order */}
            <Button
              aria-label='Order Product'
              variant='contained'
              onClick={event => handleAddToCart(event, product.id || '')}
              sx={{
                backgroundColor: 'primary.main',
                '&:hover': { backgroundColor: 'primary.dark' },
                height: 40,
                width: { xs: '100%', md: '30%' } // Lebar penuh di layar kecil, 30% di layar besar
              }}
            >
              <Typography>Order</Typography>
            </Button>
          </Stack>
        </Box>
      </Stack>
    </Box>
  )
}

export default ProductDetail
