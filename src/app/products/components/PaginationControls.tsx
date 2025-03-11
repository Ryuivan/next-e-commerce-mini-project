'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import Pagination from '@mui/material/Pagination'
import { Box } from '@mui/material'

type PaginationControlsProps = {
  totalPages: number
}

const PaginationControls = ({ totalPages }: PaginationControlsProps) => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    const params = new URLSearchParams(searchParams.toString())

    if (value > 1) {
      params.set('page', value.toString())
    } else {
      params.delete('page')
    }

    replace(`${pathname}?${params.toString()}`)
  }

  return (
    <Box>
      <Pagination
        count={totalPages}
        page={Number(searchParams.get('page')) || 1}
        onChange={handlePageChange}
        variant='tonal'
        shape='rounded'
        color='primary'
      />
    </Box>
  )
}

export default PaginationControls
