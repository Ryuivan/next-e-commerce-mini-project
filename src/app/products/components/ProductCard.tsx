'use client'

import type { MouseEvent } from 'react'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { Card, CardContent, Stack, Box, Typography, CardActions, IconButton } from '@mui/material'

import type { ProductType } from '@/app/dashboard/product/types'
import { logger } from '@/utils/logger'
import { addOrder } from '../actions'

type ProductCardProps = {
  product: ProductType
  userId?: string
}

const ProductCard = ({ product, userId }: ProductCardProps) => {
  const { push } = useRouter()

  const handleRedirect = (id: string) => {
    push(`/products/${id}`)
  }

  const handleAddToCart = async (event: MouseEvent<HTMLButtonElement>, productId: string) => {
    event.stopPropagation()

    try {
      if (!userId) throw new Error('User ID is not found')

      const success = await addOrder(productId, userId)

      if (!success) throw new Error('Failed to add order')

      logger('Add to cart clicked', 'success', 'info')
    } catch (error: any) {
      logger('Add to cart clicked', error, 'error')
    }
  }

  return (
    <Card sx={{ borderRadius: '8px' }}>
      <CardContent className='cursor-pointer' onClick={() => handleRedirect(product.id || '')}>
        <Image
          src={product.image_Url}
          width={500}
          height={500}
          alt={`${product.name}'s Picture`}
          style={{
            objectFit: 'cover',
            objectPosition: 'center',
            width: '100%',
            height: '300px',
            borderRadius: '8px'
          }}
        />
        <Stack direction='row' width='100%' justifyContent='space-between' alignItems='center' className='mt-5'>
          <Box>
            <Typography color='text.primary' fontSize='18px' fontWeight={600}>
              {product.name}
            </Typography>
          </Box>
          <CardActions className='card-actions-dense p-0'>
            <IconButton
              color='primary'
              aria-label='Add to cart'
              onClick={event => handleAddToCart(event, product.id || '')}
              className='p-0'
            >
              <i className='tabler-shopping-cart-plus' />
            </IconButton>
          </CardActions>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default ProductCard
