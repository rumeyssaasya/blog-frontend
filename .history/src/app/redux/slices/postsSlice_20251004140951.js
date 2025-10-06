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
  "posts/create-post",
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
    const res = await axios.post(`${API_URL}/create-post`, body, config);
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


export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async ({ postId, formData }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.put(
        `${API_URL}/${postId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            // axios FormData gönderirken Content-Type otomatik ayarlanır, bunu eklemeye gerek yok
          }
        }
      );

      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: "Update failed" });
    }
  }
);


export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (postId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_URL}/${postId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return postId; // reducer bunu kullanacak
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: "Delete failed" });
    }
  }
);

export const getPostById = createAsyncThunk(
  "posts/getPost",
  async (postId,{ rejectWithValue })=>{
    try{
      const res = await axios.get(`${API_URL}/${postId}`)
      return res.data;
    }catch (err){
      return rejectWithValue(err.response?.data || { message: "Getting Post failed " });
    }
  }
);


const postSlice = createSlice({
  name: 'posts',
  initialState: {
    items: [],
    singlePost:
    status: 'idle', 
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
    .addCase(deletePost.fulfilled, (state, action) => {
      state.items = state.items.filter(post => post._id !== action.payload);
    })
    .addCase(updatePost.fulfilled, (state, action) => {
      state.items = state.items.map(post =>
          post._id === action.payload._id ? action.payload : post
      );
    })

      .addCase(getPostById.fulfilled, (state,action)=>{
        state.status = 'succeeded';
          state.items = action.payload;
      })
            // Yeni post oluştur
      .addCase(createPost.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Tek post geldiği için array başına ekliyoruz
        state.items = [action.payload, ...state.items];
      })
      .addCase(createPost.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message || "Post paylaşılırken hata oluştu";
      })
      
      // Tüm postları çek
      .addCase(fetchPosts.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload; // payload array
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

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
