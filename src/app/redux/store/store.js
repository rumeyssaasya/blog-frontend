'use client'

import { configureStore } from '@reduxjs/toolkit';
import postReducer from '../slices/postsSlice';
import usersReducer from '../slices/usersSlices';
import authReducer from '../slices/authSlice';
import registerReducer from '../slices/registerSlice';
import commentReducer from '../slices/commentsSlice'
import adminReducer from '../slices/adminSlice'

export const store = configureStore({
  reducer: {
    posts: postReducer,
    users: usersReducer,
    auth: authReducer,
    register: registerReducer,
    comments: commentReducer,
    admin: adminReducer
  },
});
