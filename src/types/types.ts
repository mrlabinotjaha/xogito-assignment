import { Status } from './enums'

export type Project = {
  id: string
  name: string
  description: string
  owner: string
}

export type Projects = {
  projects: Project[]
  status?: string
  users: User[]
}

export type User = {
  id: string
  name: string
  email: string
}

export type ProjectsState = {
  error: string
  status: Status
  projects: Project[]
}

export type UsersState = {
  error: string
  status: Status
  users: User[]
}
