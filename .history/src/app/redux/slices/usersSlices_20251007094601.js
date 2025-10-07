import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
 
export const fetchAllUsers = createAsyncThunk(
  'users/fetchAllUsers',
  async () => {
    const res = await axios.get('http://localhost:5000/api/users');
    return res.data;
  }
);
 
export const getUserProfile = createAsyncThunk(
  'users/getUserProfile',
  async ({ userId, token }, { rejectWithValue }) => { 
    try {
      const config = token ? {
        headers: { Authorization: `Bearer ${token}` }
      } : {};
      
      const res = await axios.get(`http://localhost:5000/api/users/${userId}`, config);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: 'Profil yüklenirken hata oluştu' });
    }
  }
);
 
export const searchUsers = createAsyncThunk(
  "search/searchUsers",
  async ({ q }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/users/search", {
        params: { q }
      });
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: "Kullanıcı araması başarısız" });
    }
  }
);
 
export const updateUser = createAsyncThunk(
  'users/updateUser',
  async ({ id, data, token }) => {
    const res = await axios.put(`http://localhost:5000/api/users/${id}`, data, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
  }
);
 
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
    profile: null, 
    status: 'idle',
    error: null,
  },
  reducers: {
    clearProfile: (state) => {
      state.profile = null;
      state.status = 'idle';
      state.error = null;
    },
    clearSearch: (state) => {
      state.items = [];
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getUserProfile.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.status = 'succeeded';
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message || action.error?.message;
        state.profile = null;
      })
      .addCase(searchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(searchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message || action.error?.message;
      })    
      
      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.items.findIndex(u => u._id === action.payload._id);
        if (index !== -1) state.items[index] = action.payload;
        if (state.profile?._id === action.payload._id) state.profile = action.payload;
      })
      
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.items = state.items.filter(u => u._id !== action.payload);
        if (state.profile?._id === action.payload) state.profile = null;
      })
      
      .addCase(fetchAllUsers.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message || action.error?.message;
      });
  },
});

export const { clearProfile, clearSearch } = usersSlice.actions;
export default usersSlice.reducer;