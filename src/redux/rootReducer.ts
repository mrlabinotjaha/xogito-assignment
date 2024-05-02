import { combineReducers } from '@reduxjs/toolkit'
import usersReducer from './slices/usersSlice'
import projectsReducer from './slices/projectsSlice'

const rootReducer = combineReducers({
  users: usersReducer,
  projects: projectsReducer,
})

export default rootReducer
