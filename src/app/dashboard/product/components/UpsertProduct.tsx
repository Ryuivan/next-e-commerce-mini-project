'use client'

import { useEffect, useTransition } from 'react'

import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import Grid from '@mui/material/Grid2'
import { DialogActions } from '@mui/material'

import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import CustomTextField from '@core/components/mui/TextField'
import Form from '@components/Form'

import type { ProductType } from '../types'

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  description: yup.string().required('Description is required'),
  price: yup.number().required('Price is required'),
  stok: yup.number().required('Stok is required'),
  image_Url: yup.string().required('Image url is required')
})

type ProductTypeData = Pick<ProductType, 'name' | 'description' | 'price' | 'stok' | 'image_Url'>

type ProductDialogTypeProps = {
  userId: string
  open: boolean
  mode: 'add' | 'edit'
  initialProduct: ProductType | null
  setOpen: (open: boolean) => void
  onAddProduct: (product: ProductType) => void
  onUpdateProduct: (product: ProductType) => void
}

const UpsertProduct = ({
  userId,
  open,
  mode,
  initialProduct,
  setOpen,
  onAddProduct,
  onUpdateProduct
}: ProductDialogTypeProps) => {
  const [isPending, startTransition] = useTransition()

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ProductTypeData>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      description: '',
      price: 0,
      stok: 0,
      image_Url: ''
    }
  })

  useEffect(() => {
    if (initialProduct && mode === 'edit') {
      reset(initialProduct)
    } else {
      reset({
        name: '',
        description: '',
        price: 0,
        stok: 0,
        image_Url: ''
      })
    }
  }, [initialProduct, mode, reset])

  const onSubmit = (data: ProductTypeData) => {
    startTransition(async () => {
      try {
        if (mode === 'add') {
          onAddProduct({ ...data, id_user: userId })
        } else if (initialProduct?.id) {
          onUpdateProduct({ ...initialProduct, ...data })
        }

        reset()
        setOpen(false)
      } catch (error) {
        console.error(`Error ${mode === 'add' ? 'adding' : 'updating'} location:`, error)
        alert(`Failed to ${mode === 'add' ? 'add' : 'update'} location`)
      }
    })
  }

  // ✅ **handleClose prevents closing on backdrop click or Escape key**
  const handleClose = (event: object, reason: 'backdropClick' | 'escapeKeyDown' | 'closeClick' | string) => {
    if (reason === 'backdropClick' || reason === 'escapeKeyDown') return
    handleCancel() // Calls handleCancel to ensure form resets
  }

  // ✅ **handleCancel resets the form & closes modal manually**
  const handleCancel = () => {
    reset()
    setOpen(false)
  }

  return (
    <Dialog
      open={open}
      disableEscapeKeyDown
      closeAfterTransition={false}
      onClose={handleClose}
      aria-labelledby='form-dialog-title'
    >
      <DialogTitle id='form-dialog-title'>{mode === 'add' ? 'Add New Product' : 'Edit Product'}</DialogTitle>
      <DialogContent>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={6}>
            <Grid size={12}>
              <Controller
                name='name'
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    label='Name'
                    placeholder='Product Name'
                    error={!!errors.name}
                    helperText={errors.name?.message}
                  />
                )}
              />
            </Grid>

            <Grid size={12}>
              <Controller
                name='description'
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    label='Description'
                    placeholder='Product Description'
                    error={!!errors.description}
                    helperText={errors.description?.message}
                  />
                )}
              />
            </Grid>

            <Grid size={12}>
              <Controller
                name='price'
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    type='number'
                    label='Price'
                    placeholder='Product Price'
                    error={!!errors.price}
                    helperText={errors.price?.message}
                    onChange={event => Number(event.target.value)}
                  />
                )}
              />
            </Grid>

            <Grid size={12}>
              <Controller
                name='stok'
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    label='Stock'
                    type='number'
                    placeholder='Product Stock'
                    error={!!errors.stok}
                    helperText={errors.stok?.message}
                    onChange={event => Number(event.target.value)}
                  />
                )}
              />
            </Grid>

            <Grid size={12}>
              <Controller
                name='image_Url'
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    label='Image Url'
                    placeholder='Product Image Url'
                    error={!!errors.image_Url}
                    helperText={errors.image_Url?.message}
                  />
                )}
              />
            </Grid>
          </Grid>

          <DialogActions className='mt-4 p-0'>
            <Button variant='outlined' color='error' onClick={handleCancel}>
              Cancel
            </Button>
            <Button variant='contained' type='submit' disabled={isPending} color={mode === 'add' ? 'primary' : 'info'}>
              {isPending ? (mode === 'add' ? 'Adding...' : 'Updating...') : mode === 'add' ? 'Add' : 'Update'}
            </Button>
          </DialogActions>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default UpsertProduct
