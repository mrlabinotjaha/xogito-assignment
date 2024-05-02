import ProjectList from '../components/ProjectList'
import Container from '@mui/material/Container'
import { useEffect } from 'react'
import { RootState, AppDispatch } from '../store'
import { useDispatch, useSelector } from 'react-redux'

import { fetchProjects } from '../redux/slices/projectsSlice'
import { fetchUsers } from '../redux/slices/usersSlice'

export default function Projects() {
  const dispatch: AppDispatch = useDispatch()
  const { projects, status: projectsStatus } = useSelector((state: RootState) => state.projects)
  const { users, status: usersStatus } = useSelector((state: RootState) => state.users)

  useEffect(() => {
    if (projectsStatus === 'idle') {
      dispatch(fetchProjects())
    }

    if (usersStatus === 'idle') {
      dispatch(fetchUsers())
    }
  }, [dispatch, usersStatus, projectsStatus])

  return (
    <Container maxWidth="xl">
      <ProjectList projects={projects} users={users} status={projectsStatus} />
    </Container>
  )
}
