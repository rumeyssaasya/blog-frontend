'use client'

import { configureStore } from '@reduxjs/toolkit';
import postReducer from '../slices/postsSlice';
import usersReducer from '../slices/usersSlices';

export const store = configureStore({
  reducer: {
    posts: postReducer,
    users: usersReducer,
  },
});
