import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { UsersState } from '../../types/types'
import { Status } from '../../types/enums'

export const fetchUsers = createAsyncThunk('projects/fetchUsers', async () => {
  const response = await fetch('http://localhost:3001/users')
  const data = await response.json()
  return data
})

const initialState: UsersState = {
  users: [],
  status: Status.IDLE,
  error: '',
}

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = Status.LOADING
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = Status.SUCCEEDED
        state.users = action.payload
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = Status.FAILED
        state.error = action.error.message || ''
      })
  },
})

export default usersSlice.reducer
