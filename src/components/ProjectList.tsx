import { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import Typography from '@mui/material/Typography'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import IconButton from '@mui/material/IconButton'
import { Edit } from '@mui/icons-material'
import { Project, Projects } from '../types/types'
import ProjectFormModal from './modals/ProjectFormModal'
import TableFooter from './table/TableFooter'
import TableHeader from './table/TableHeader'
import TableSkeleton from './table/TableSkeleton'
import Search from './Search'
import { Status } from '../types/enums'

export default function ProjectsList({ projects, status, users }: Projects) {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [searchText, setSearchText] = useState('')
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects)
  const [isModalOpen, setModalOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredProjects.length) : 0

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleOpenModal = (project?: Project) => {
    setSelectedProject(project ?? null)
    setModalOpen(true)
  }

  const handleCloseModal = () => {
    setModalOpen(false)
    setSelectedProject(null)
  }

  const handleSearchChange = (debouncedValue: string) => {
    setSearchText(debouncedValue)
  }

  const toUserName = (id: string): string => {
    const user = users.find((user) => user.id === id)
    return user ? user.name : ''
  }

  useEffect(() => {
    setFilteredProjects(projects.filter((project: Project) => project.name.toLowerCase().includes(searchText.toLowerCase()) || project.description.toLowerCase().includes(searchText.toLowerCase())))
  }, [searchText, projects])

  return (
    <Box sx={{ marginTop: 3 }}>
      <ProjectFormModal isOpen={isModalOpen} onClose={handleCloseModal} project={selectedProject} users={users} />
      <Box sx={{ textAlign: 'right', display: 'flex', justifyContent: 'space-between' }}>
        <Search onChange={handleSearchChange} />
        <Button variant="contained" color="primary" onClick={() => handleOpenModal()}>
          Create Project
        </Button>
      </Box>
      <TableContainer component={Paper} sx={{ maxHeight: 'calc(100vh - 210px)', marginTop: 3 }}>
        {status === Status.LOADING ? (
          <TableSkeleton />
        ) : status === Status.FAILED ? (
          <Box sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h6" color="error">
              There was a problem loading the data. Please try again later.
            </Typography>
          </Box>
        ) : (
          <Table sx={{ minWidth: 500 }} stickyHeader aria-label="sticky table">
            <TableHeader />

            <TableBody>
              {(rowsPerPage > 0 ? filteredProjects.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : filteredProjects).map((row) => (
                <TableRow key={row.id} sx={{ '&:hover': { backgroundColor: '#f5f5f5' } }}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.description}</TableCell>
                  <TableCell>{toUserName(row.owner.toString())}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleOpenModal(row)} aria-label="edit">
                      <Edit />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </TableContainer>
      <TableFooter projectsLength={filteredProjects.length} page={page} rowsPerPage={rowsPerPage} onPageChange={handleChangePage} onRowsPerPageChange={handleChangeRowsPerPage} />
    </Box>
  )
}
