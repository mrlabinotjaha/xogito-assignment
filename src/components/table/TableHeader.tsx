import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'

export default function TableHeader() {
  type Column = {
    id: string
    label: string
  }

  const COLUMNS: Column[] = [
    { id: 'name', label: 'Project name' },
    { id: 'description', label: 'Description' },
    { id: 'owner', label: 'Owner' },
    { id: 'edit', label: 'Edit' },
  ]

  return (
    <TableHead>
      <TableRow>
        {COLUMNS.map((column: Column) => (
          <TableCell key={column.id} sx={{ fontWeight: 'bold' }}>
            {column.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}
