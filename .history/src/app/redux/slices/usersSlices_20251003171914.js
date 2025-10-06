import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Async action
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const res = await axios.get('http://localhost:5000/api/users'); // backend URL
  return res.data;
});

// updateUser
export const updateUser = createAsyncThunk(
  'users/updateUser',
  async ({ id, data, token }) => {
    const res = await axios.put(`http://localhost:5000/api/users/${id}`, data, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
  }
);

// deleteUser
export const deleteUser = createAsyncThunk(
  'users/deleteUser',
  async ({ id, token }) => {
    await axios.delete(`http://localhost:5000/api/users/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return id; // geri döndürdüğümüz id ile state’ten çıkartabiliriz
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    items: [],
    status: 'idle', // idle, loading, succeeded, failed
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchUsers.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default usersSlice.reducer;
