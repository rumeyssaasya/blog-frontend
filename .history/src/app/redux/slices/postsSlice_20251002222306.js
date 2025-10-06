import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/posts';

// Mevcut tüm postları çekme
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const res = await axios.get(API_URL);
  return res.data;
});

//post oluşturma
export const createPost = createAsyncThunk(
  "posts/",
  async ({ title, content, image }, { getState }) => {
    const token = localStorage.getItem("token");

    let config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    let body;

    if (image) {
      // Eğer resim varsa form-data
      body = new FormData();
      body.append("title", title);
      body.append("content", content);
      body.append("image", image);
      // form-data için content-type header otomatik eklenir
    } else {
      // Sadece text varsa JSON
      body = { title, content };
      config.headers["Content-Type"] = "application/json";
    }

    const res = await axios.post(API_URL, body, config);
    return res.data;
  }
);


// Kullanıcıya özel postları çekme
export const fetchUserPosts = createAsyncThunk(
  'posts/fetchUserPosts',
  async (userId, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_URL}/user/${userId}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: 'Unknown error' });
    }
  }
);

const postSlice = createSlice({
  name: 'posts',
  initialState: {
    items: [],
    status: 'idle', // idle, loading, succeeded, failed
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    // Yeni post ekleme
      builder
      .addCase(createPost.fulfilled, (state, action) => {
        state.items.unshift(action.payload); // en üste ekle
      })
      .addCase(createPost.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items.unshift(action.payload);
      })
      .addCase(createPost.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Tüm postlar
      .addCase(fetchPosts.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Kullanıcıya özel postlar
      .addCase(fetchUserPosts.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchUserPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchUserPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.message;
      });
  },
});

export default postSlice.reducer;
