'use client'

import { useState, useEffect, useMemo } from 'react'
import { Button, Card, CardHeader, Checkbox, MenuItem } from '@mui/material'
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
import { addOrder } from '../actions'
import { createClient } from '@/utils/supabase/client'

interface TableProps<T> {
  data: T[]
  tableName: string
  dynamicColumns: ColumnDef<T, any>[]
}

export default function OrderTable<T extends { id?: string | undefined | null }>(
  { data, tableName, dynamicColumns }: TableProps<T>
) {
  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({})
  const [searchTerm, setSearchTerm] = useState('')
  const [sorting, setSorting] = useState<SortingState>([])
  const [userId, setUserId] = useState<string | null>(null)
  const supabase = createClient()

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient()
      const { data, error } = await supabase.auth.getUser()
      if (data?.user) setUserId(data.user.id)
    }
    fetchUser()
  }, [])

  const selectedCount = Object.keys(rowSelection).length

  const sortableDynamicColumns = useMemo(
    () => dynamicColumns.map(column => ({ ...column, enableSorting: true })),
    [dynamicColumns]
  )

  const rowSelectColumn = useMemo<ColumnDef<T>>(
    () => ({
      id: 'select',
      enableSorting: false,
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllRowsSelected()}
          indeterminate={table.getIsSomeRowsSelected()}
          onChange={table.getToggleAllRowsSelectedHandler()}
        />
      ),
      cell: ({ row }) => (
        <div className='flex justify-center'>
          <Checkbox
            checked={row.getIsSelected()}
            onChange={row.getToggleSelectedHandler()}
          />
        </div>
      )
    }),
    []
  )

  const modifiedColumns = useMemo(() => [rowSelectColumn, ...sortableDynamicColumns], [rowSelectColumn, sortableDynamicColumns])

  const table = useReactTable({
    data,
    columns: modifiedColumns,
    getRowId: row => String(row.id),
    state: { rowSelection, sorting, globalFilter: searchTerm },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel()
  })

  const currentPageRows = table.getRowModel().rows
  const filteredCount = table.getFilteredRowModel().rows.length

  const handleMakeOrder = async () => {
    try {
      const { data, error } = await supabase.auth.getUser()
      if (error || !data?.user) {
        console.error('User not authenticated', error)
        return
      }
  
      const userId = data.user.id 
      console.log('User ID:', userId) 
  
      const selectedData = table.getSelectedRowModel().flatRows
        .map(row => row.original)
        .filter(product => typeof product.id === 'string')
  
      if (selectedData.length === 0) {
        console.warn('No valid products selected for order.')
        return
      }
  
      for (const product of selectedData) {
        try {
          await addOrder(product.id!, userId) 
          console.log(`Order successful for product ID: ${product.id}`)
        } catch (orderError) {
          console.error(`Order failed for product ID: ${product.id}`, orderError)
        }
      }
    } catch (fetchError) {
      console.error('Error fetching user data:', fetchError)
    }
  }
  
  

  return (
    <Card>
      <CardHeader title={tableName} />
      <div className='p-6 border-b flex justify-between items-center'>
        <div className='flex gap-4'>
          <CustomTextField
            select
            value={table.getState().pagination.pageSize}
            onChange={e => {
              table.setPageSize(Number(e.target.value))
              table.setPageIndex(0)
            }}
          >
            {[5, 10, 15].map(size => (
              <MenuItem key={size} value={size}>{size}</MenuItem>
            ))}
          </CustomTextField>
          <CustomTextField
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder='Search...'
          />
        </div>
      </div>
      <div className='overflow-x-auto'>
      <table className='w-full border-collapse'>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id} className='border-b'>
              {headerGroup.headers.map(header => (
                <th key={header.id} className='py-2 text-left'>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {currentPageRows.length === 0 ? (
            <tr>
              <td colSpan={modifiedColumns.length} className='text-center py-4'>
                No data found
              </td>
            </tr>
          ) : (
            currentPageRows.map(row => (
              <tr key={row.id} className='border-b'>
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className='py-2 text-left'>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>

      </div>
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
      {selectedCount > 0 && (
        <div className='p-4 flex justify-center'>
          <Button variant='contained' color='primary' onClick={handleMakeOrder}>Make Order</Button>
        </div>
      )}
    </Card>
  )
}
