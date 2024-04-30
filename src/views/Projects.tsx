import ProjectList from '../components/ProjectList'
import Container from '@mui/material/Container'
import ApiService from '../api/apiService'
import { useEffect, useState } from 'react'

export default function Projects() {
  const [projects, setProjects] = useState([])

  useEffect(() => {
    ApiService.fetchProjects()
      .then((response) => {
        setProjects(response.data)
        console.log(response.data)
      })
      .catch((error) => {
        console.error('Error fetching users:', error)
      })
  }, [])

  return (
    <Container maxWidth="xl">
      <ProjectList projects={projects} />
    </Container>
  )
}
