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
    <Box className='w-full h-full flex items-center justify-center '>
      <Stack direction='row' justifyContent='center' className='max-w-3xl space-x-10'>
        <Box>
          <Image src={product.image_Url} alt={product.name} width={300} height={300} className='shadow-md' />
        </Box>
        <Box>
          <Stack spacing={2} direction='column'>
            <Box>
              <Typography className='font-bold text-2xl text-primary'>{product.name}</Typography>
            </Box>

            <Box>
              <Typography className='font-bold text-lg'>{formatPrice(product.price)}</Typography>
            </Box>
            <Box>
              <Typography className='font-bold text-md text-secondary'> stock Product: {product.stok}</Typography>
            </Box>
            <Box>
              <Typography className='font-normal text-base text-secondary text-justify'>
                {product.description}
              </Typography>
            </Box>
            {/* <Button
              variant='outlined'
              color='primary'
              endIcon={<i className='tabler-shopping-cart-plus' />}
              className='mt-5 uppercase'
              onClick={event => handleAddToCart(event, product.id || '')}
            >
              Add to cart
            </Button> */}
            <Button
              aria-label='Order Product'
              variant='contained'
              onClick={event => handleAddToCart(event, product.id || '')}
              sx={{
                backgroundColor: 'primary.main',
                '&:hover': { backgroundColor: 'primary.dark' },
                height: 40,
                width: '30%'
              }}
            >
              {' '}
              <Typography>Order</Typography>
            </Button>
          </Stack>
        </Box>
      </Stack>
    </Box>
  )
}

export default ProductDetail
