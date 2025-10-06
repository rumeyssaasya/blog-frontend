// redux/slices/authSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Backend URL
const API_URL = 'http://localhost:5000/api/auth';

// Async thunk: login
export const loginUser = createAsyncThunk('auth/loginUser', async (credentials, { rejectWithValue }) => {
  try {
    const res = await axios.post(`${API_URL}/login`, credentials);
    return res.data; // { token, user }
    const token = res.data.token;
    localStorage.setItem('token', token);
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

// Async thunk: register
export const registerUser = createAsyncThunk('auth/registerUser', async (userData, { rejectWithValue }) => {
  try {
    const res = await axios.post(`${API_URL}/register`, userData);
    return res.data; // { token, user }
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.status = 'idle';
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // LOGIN
      .addCase(loginUser.pending, (state) => { state.status = 'loading'; state.error = null })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => { state.status = 'failed'; state.error = action.payload.message })

      // REGISTER
      .addCase(registerUser.pending, (state) => { state.status = 'loading'; state.error = null })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(registerUser.rejected, (state, action) => { state.status = 'failed'; state.error = action.payload.message })
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
