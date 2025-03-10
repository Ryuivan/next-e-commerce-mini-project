'use client'

import type { MouseEvent } from 'react'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { Card, CardContent, Stack, Box, Typography, CardActions, IconButton } from '@mui/material'

import type { ProductType } from '@/app/dashboard/product/types'
import { logger } from '@/utils/logger'

type ProductCardProps = {
  product: ProductType
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { push } = useRouter()

  const handleRedirect = (id: string) => {
    push(`/products/${id}`)
  }

  const handleAddToCart = (event: MouseEvent<HTMLButtonElement>, name: string) => {
    event.stopPropagation()
    logger('Add to cart clicked', name, 'info')
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
              onClick={event => handleAddToCart(event, product.name)}
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
