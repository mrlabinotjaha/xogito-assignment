import axios from './axios'

const ApiService = {
  // User APIs
  fetchUsers() {
    return axios.get('users')
  },
  fetchUserById(id: number) {
    return axios.get(`users/${id}`)
  },
  createUser(userData: object) {
    return axios.post('users', userData)
  },
  updateUser(id: number, userData: object) {
    return axios.put(`users/${id}`, userData)
  },
  deleteUser(id: number) {
    return axios.delete(`users/${id}`)
  },

  // Project APIs
  fetchProjects() {
    return axios.get('projects')
  },
  fetchProjectById(id: number) {
    return axios.get(`projects/${id}`)
  },
  createProject(projectData: object) {
    return axios.post('projects', projectData)
  },
  updateProject(id: number, projectData: object) {
    return axios.put(`projects/${id}`, projectData)
  },
  deleteProject(id: number) {
    return axios.delete(`projects/${id}`)
  },
}

export default ApiService
