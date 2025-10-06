import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/posts';

// Tüm postları çek
export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(API_URL);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: 'Unknown error' });
    }
  }
);

// Post beğen
export const likePost = createAsyncThunk(
  "posts/likePost",
  async (postId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        `${API_URL}/${postId}/like`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return { postId, post: res.data }; // backend post objesini dönmeli
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const initialState = {
  items: [],
  singlePost: null,
  status: 'idle',
  error: null,
};

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearSearch: (state) => {
      state.items = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Like Post
      .addCase(likePost.fulfilled, (state, action) => {
        const { postId, post } = action.payload;
        const index = state.items.findIndex(p => p._id === postId);
        if (index !== -1) {
          state.items[index] = post; // backend’den gelen post objesi ile güncelle
        }
      })
      // Delete Post
      .addCase(deletePost.fulfilled, (state, action) => {
        state.items = state.items.filter(post => post._id !== action.payload);
      })
      // Update Post
      .addCase(updatePost.fulfilled, (state, action) => {
        state.items = state.items.map(post =>
          post._id === action.payload._id ? action.payload : post
        );
      })
      // Get Post by ID
      .addCase(getPostById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.singlePost = action.payload;
      })
      .addCase(getPostById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message || 'Post yüklenirken hata oluştu';
      })
      // Create Post
      .addCase(createPost.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = [action.payload, ...state.items];
      })
      // Fetch Posts
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { clearSearch } = postSlice.actions;
export default postSlice.reducer;
