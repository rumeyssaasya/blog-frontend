'use client'

import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import postReducer from './slices/postSlice'

export const store = configureStore({
  reducer: {
    posts: postReducer,
    // diğer slice'lar burada eklenebilir
  },
})