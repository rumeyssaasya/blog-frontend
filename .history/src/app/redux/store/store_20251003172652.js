'use client'

import { configureStore } from '@reduxjs/toolkit';
import postReducer from '../slices/postsSlice';
import usersReducer from '../slices/usersSlices';
import authReducer from '../slices/authSlice';
import registerReducer from '../slices/registerSlice';;

export const store = configureStore({
  reducer: {
    posts: postReducer,
    users: usersReducer,
    auth: authReducer,
    register: registerReducer,
  },
});
