import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Kullanıcıya ait postları fetch et (token gerekmiyor)
export const fetchUser = createAsyncThunk(
  'posts/fetchUser',
  async () => {
    const res = await axios.get(`http://localhost:5000/api/posts/user/`);
    return res.data;
  }
);

// Belirli bir kullanıcı profilini fetch et (token gerekmiyor)
export const getUserProfile = createAsyncThunk(
  'users/getUserProfile',
  async (userId) => {
    const res = await axios.get(`http://localhost:5000/api/users/${userId}`);
    return res.data;
  }
);

// Kullanıcı güncelle (token gerekli)
export const updateUser = createAsyncThunk(
  'users/updateUser',
  async ({ id, data, token }) => {
    const res = await axios.put(`http://localhost:5000/api/users/${id}`, data, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
  }
);

// Kullanıcı sil (token gerekli)
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
    profile: null, // tekil kullanıcı profili için
    status: 'idle', 
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.items.findIndex(u => u._id === action.payload._id);
        if (index !== -1) state.items[index] = action.payload;
        if (state.profile?._id === action.payload._id) state.profile = action.payload;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.items = state.items.filter(u => u._id !== action.payload);
        if (state.profile?._id === action.payload) state.profile = null;
      })
      .addCase(fetchUser.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
      });
  },
});

export default usersSlice.reducer;
