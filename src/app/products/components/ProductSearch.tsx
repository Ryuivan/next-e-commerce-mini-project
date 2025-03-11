'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import CustomTextField from '@/@core/components/mui/TextField'

const ProductSearch = () => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const {replace} = useRouter()

  function handleSearch(term: string) {
    const params = new URLSearchParams(searchParams.toString())

    if (term) {
      params.set('product', term)
    } else {
      params.delete('product')
    }

    replace(`${pathname}?${params.toString()}`)
  }

  return (
    <CustomTextField
      type='search'
      placeholder='Search products'
      fullWidth
      onChange={e => handleSearch(e.target.value)}
      defaultValue={searchParams.get('product')?.toString()}
    />
  )
}

export default ProductSearch
