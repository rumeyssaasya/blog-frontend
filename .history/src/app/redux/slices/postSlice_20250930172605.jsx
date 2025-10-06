"use client"
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// async veri çekme
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const res = await fetch('/api/posts') // backend endpoint
  return res.json()
})

const postsSlice = createSlice({
  name: 'posts',
  initialState: { items: [], status: 'idle' },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => { state.status = 'loading' })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload
      })
      .addCase(fetchPosts.rejected, (state) => { state.status = 'failed' })
  }
})

export default postsSlice.reducer
