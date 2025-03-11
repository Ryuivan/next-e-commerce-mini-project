'use client'

import { useState, useEffect, useMemo } from 'react'
import { Button, Card, CardHeader, MenuItem } from '@mui/material'
import TablePagination from '@mui/material/TablePagination'
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getFilteredRowModel,
  getSortedRowModel
} from '@tanstack/react-table'
import type { ColumnDef, SortingState } from '@tanstack/react-table'
import TablePaginationComponent from '@components/TablePaginationComponent'
import CustomTextField from '@/@core/components/mui/TextField'
import { createClient } from '@/utils/supabase/client'

interface TableProps<T> {
  data: T[]
  tableName: string
  dynamicColumns: ColumnDef<T, any>[]
}

export default function OrderTable<T extends { id?: string | undefined | null }>({
  data,
  tableName,
  dynamicColumns
}: TableProps<T>) {
  const [searchTerm, setSearchTerm] = useState('')
  const [sorting, setSorting] = useState<SortingState>([])
  const [userId, setUserId] = useState<string | null>(null)

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient()
      const { data, error } = await supabase.auth.getUser()
      if (data?.user) setUserId(data.user.id)
    }
    fetchUser()
  }, [])

  const sortableDynamicColumns = useMemo(
    () => dynamicColumns.map(column => ({ ...column, enableSorting: true })),
    [dynamicColumns]
  )

  const table = useReactTable({
    data,
    columns: sortableDynamicColumns,
    getRowId: row => String(row.id),
    state: { sorting, globalFilter: searchTerm },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel()
  })

  const currentPageRows = table.getRowModel().rows
  const filteredCount = table.getFilteredRowModel().rows.length

  return (
    <Card className='p-4'>
      <CardHeader title={tableName} className='text-lg font-semibold' />

      {/* Search & Page Size Controls */}
      <div className='p-4 border-b flex flex-wrap gap-4 items-center'>
        <CustomTextField
          select
          value={table.getState().pagination.pageSize}
          onChange={e => {
            table.setPageSize(Number(e.target.value))
            table.setPageIndex(0)
          }}
        >
          {[5, 10, 15].map(size => (
            <MenuItem key={size} value={size}>
              {size}
            </MenuItem>
          ))}
        </CustomTextField>
        <CustomTextField value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder='Search...' />
      </div>

      {/* Table Content */}
      <div className='overflow-x-auto'>
        <table className='w-full border-collapse'>
          <thead className='border-b'>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id} className='text-left'>
                {headerGroup.headers.map(header => (
                  <th key={header.id} className='p-2'>
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {currentPageRows.length === 0 ? (
              <tr>
                <td colSpan={sortableDynamicColumns.length} className='text-center p-4 text-gray-500'>
                  No data found
                </td>
              </tr>
            ) : (
              currentPageRows.map(row => (
                <tr key={row.id} className='border-b'>
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id} className='p-3 w-1/4'>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <TablePagination
        component={() => <TablePaginationComponent<T> table={table} />}
        count={filteredCount}
        page={table.getState().pagination.pageIndex}
        rowsPerPage={table.getState().pagination.pageSize}
        onPageChange={(_, newPage) => table.setPageIndex(newPage)}
        onRowsPerPageChange={e => {
          table.setPageSize(Number(e.target.value))
          table.setPageIndex(0)
        }}
      />
    </Card>
  )
}
