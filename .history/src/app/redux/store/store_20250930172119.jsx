import { configureStore } from '@reduxjs/toolkit'
import postsReducer from './postsSlice'
import membersReducer from './membersSlice'

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    members: membersReducer,
  },
})
