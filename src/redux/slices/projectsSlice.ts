import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { Project, ProjectsState } from '../../types/types'
import { Status } from '../../types/enums'

export const fetchProjects = createAsyncThunk<Project[], void>('projects/fetchProjects', async () => {
  const response = await fetch('http://localhost:3000/projects')
  const data: Project[] = await response.json()

  // Simulate a delay to show the skeleton component.
  // const delayData = await new Promise<Project[]>((resolve) => setTimeout(() => resolve(data), 1000))
  return data
})

const initialState: ProjectsState = {
  projects: [],
  status: Status.IDLE,
  error: '',
}

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    addProject(state, action: PayloadAction<Project>) {
      state.projects.unshift(action.payload)
    },
    editProject(state, action: PayloadAction<Project>) {
      const index = state.projects.findIndex((project) => project.id === action.payload.id)
      if (index !== -1) {
        state.projects[index] = action.payload
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.status = Status.LOADING
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.status = Status.SUCCEEDED
        state.projects = action.payload
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.status = Status.FAILED
        state.error = action.error.message || ''
      })
  },
})

export const { addProject, editProject } = projectsSlice.actions
export default projectsSlice.reducer
