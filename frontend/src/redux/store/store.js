import { configureStore } from '@reduxjs/toolkit'
import userSlice from '../reducers/user/userSlice'

export const store = configureStore({
  reducer: {
    user : userSlice,
  },
})