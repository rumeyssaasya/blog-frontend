// postsSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/posts';

// Tüm postları çek
export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(API_URL); // /api/posts endpoint tüm postları döndürmeli
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: 'Unknown error' });
    }
  }
);

// Yeni post oluştur
export const createPost = createAsyncThunk(
  "posts/createPost",
  async ({ title, content, image }) => {
    const token = localStorage.getItem("token");
    let config = { headers: { Authorization: `Bearer ${token}` } };
    let body;

    if (image) {
      body = new FormData();
      body.append("title", title);
      body.append("content", content);
      body.append("image", image);
      // FormData için content-type otomatik
    } else {
      body = { title, content };
      config.headers["Content-Type"] = "application/json";
    }

    const res = await axios.post(API_URL, body, config);
    return res.data;
  }
);

// Kullanıcıya özel postları çek
export const fetchUserPosts = createAsyncThunk(
  'posts/fetchUserPosts',
  async ({ userId }, { rejectWithValue }) => {
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
    status: 'idle', 
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      // createPost
      .addCase(createPost.pending, state => { state.status = 'loading'; state.error = null; })

      .addCase(createPost.fulfilled, (state, action) => { 
        state.status = 'succeeded';
        // payload tek post olduğu için state.items'e push et
        state.items.push(action.payload); })

      .addCase(createPost.rejected, (state, action) => { 
        state.status = 'failed'; state.error = action.payload?.message || "Post paylaşılırken hata oluştu"; })
      
      // fetchPosts
      .addCase(fetchPosts.pending, state => { 
        state.status = 'loading'; state.error = null; })

      .addCase(fetchPosts.fulfilled, (state, action) => { 
        state.status = 'succeeded'; state.items = action.payload; })

      .addCase(fetchPosts.rejected, (state, action) => { 
        state.status = 'failed'; state.error = action.error.message; })

      // fetchUserPosts
      .addCase(fetchUserPosts.pending, state => { 
        state.status = 'loading'; state.error = null; })

      .addCase(fetchUserPosts.fulfilled, (state, action) =>{
        state.status = 'succeeded'; state.items = action.payload; })

      .addCase(fetchUserPosts.rejected, (state, action) => { 
        state.status = 'failed'; state.error = action.payload?.message || 'Unknown error'; });
  },
});

export default postSlice.reducer;
