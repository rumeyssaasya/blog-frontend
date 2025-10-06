import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Kullanıcıları fetch et (token gerekebilir)
export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (token) => {
    const res = await axios.get('http://localhost:5000/api/users', {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
  }
);

// Kullanıcı güncelle
export const updateUser = createAsyncThunk(
  'users/updateUser',
  async ({ id, data, token }) => {
    const res = await axios.put(`http://localhost:5000/api/users/${id}`, data, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
  }
);

// Kullanıcı sil
export const deleteUser = createAsyncThunk(
  'users/deleteUser',
  async ({ id, token }) => {
    await axios.delete(`http://localhost:5000/api/users/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return id;
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
      // updateUser
      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.items.findIndex(u => u._id === action.payload._id);
        if (index !== -1) state.items[index] = action.payload;
      })
      // deleteUser
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.items = state.items.filter(u => u._id !== action.payload);
      })
      // fetchUsers
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
