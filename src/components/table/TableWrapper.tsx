import React from 'react'
import { Box, Typography } from '@mui/material'
import TableSkeleton from './TableSkeleton'
import { Status } from '../../types/enums'

type TableContainerProps = {
  status: string
  children: React.ReactNode
}

export default function TableWrapper({ status, children }: TableContainerProps) {
  if (status === Status.LOADING) {
    return <TableSkeleton />
  }

  if (status === Status.FAILED) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h6" color="error">
          There was a problem loading the data. Please try again later.
        </Typography>
      </Box>
    )
  }

  return <>{children}</>
}
