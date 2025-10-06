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
      return { postId, ...res.data };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Yeni post oluştur
export const createPost = createAsyncThunk(
  "posts/create-post",
  async ({ title, content, tags, image }) => {
    const token = localStorage.getItem("token");
    let config = { headers: { Authorization: `Bearer ${token}` } };
    let body;

    if (image) {
      body = new FormData();
      body.append("title", title);
      body.append("content", content);
      body.append("tags", tags);
      body.append("image", image);
    } else {
      body = { title, content, tags };
      config.headers["Content-Type"] = "application/json";
    }
    const res = await axios.post(`${API_URL}/create-post`, body, config);
    return res.data;
  }
);

// Kullanıcıya özel postları çek - DÜZELTİLDİ
export const fetchUserPosts = createAsyncThunk(
  'posts/fetchUserPosts',
  async ({ userId, token }, { rejectWithValue }) => { // token parametresi eklendi
    try {
      const config = token ? {
        headers: { Authorization: `Bearer ${token}` }
      } : {};
      
      const res = await axios.get(`${API_URL}/user/${userId}`, config);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: 'Kullanıcı postları yüklenirken hata oluştu' });
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
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: "Update failed" });
    }
  }
);

export const searchPosts = createAsyncThunk(
  "posts/searchPosts",
  async ({ q, authorId, tag, startDate, endDate, sort, page, limit }, { rejectWithValue }) => {
    try {
      const params = { q, authorId, tag, startDate, endDate, sort, page, limit };
      const { data } = await axios.get(`${API_URL}/search`, { params });
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: "Arama başarısız" });
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
      return postId; 
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: "Delete failed" });
    }
  }
);

export const getPostById = createAsyncThunk(
  "posts/getPost",
  async (postId, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_URL}/${postId}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: "Getting Post failed" });
    }
  }
);

export const getLikes = createAsyncThunk(
  "posts/getLikes",
  async (postId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/${postId}/likes`);
      return { postId, data: response.data };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Like bilgisi alınamadı");
    }
  }
);

const postSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [], 
    items: [],
    singlePost: null,
    status: 'idle', 
    error: null,
  },
  reducers: {
    clearSearch: (state) => {
      state.posts = [];
      state.error = null;
    },
    clearSinglePost: (state) => {
      state.singlePost = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getLikes.fulfilled, (state, action) => {
        const { postId, data } = action.payload;
        const post = state.items.find(p => p._id === postId);
        if (post) {
          post.likesCount = data.likesCount;
          post.likedByUsers = data.likedByUsers;
        }
      })
      .addCase(likePost.fulfilled, (state, action) => {
        const { postId, likesCount, likedByUsers, likedByUser } = action.payload;
        
        // state.items'i güncelle
        const index = state.items.findIndex(post => post._id === postId);
        if (index !== -1) {
          state.items[index] = {
            ...state.items[index],
            likesCount: likesCount,
            likedByUsers: likedByUsers || state.items[index].likedByUsers,
            likedByUser: likedByUser !== undefined ? likedByUser : state.items[index].likedByUser
          };
        }
        
        // state.posts'i de güncelle
        const postIndex = state.posts.findIndex(post => post._id === postId);
        if (postIndex !== -1) {
          state.posts[postIndex] = {
            ...state.posts[postIndex],
            likesCount: likesCount,
            likedByUsers: likedByUsers || state.posts[postIndex].likedByUsers,
            likedByUser: likedByUser !== undefined ? likedByUser : state.posts[postIndex].likedByUser
          };
        }
        
        // singlePost'u da güncelle
        if (state.singlePost && state.singlePost._id === postId) {
          state.singlePost = {
            ...state.singlePost,
            likesCount: likesCount,
            likedByUsers: likedByUsers || state.singlePost.likedByUsers,
            likedByUser: likedByUser !== undefined ? likedByUser : state.singlePost.likedByUser
          };
        }
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.items = state.items.filter(post => post._id !== action.payload);
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.items = state.items.map(post =>
          post._id === action.payload._id ? action.payload : post
        );
      })
      .addCase(getPostById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.singlePost = action.payload;
      })
      .addCase(getPostById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message || 'Post yüklenirken hata oluştu';
      })
      .addCase(createPost.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = [action.payload, ...state.items];
      })
      .addCase(createPost.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message || "Post paylaşılırken hata oluştu";
      })
      .addCase(searchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(searchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message || action.error?.message;
      })
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
        state.error = action.payload?.message || action.error?.message;
      })
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
        state.error = action.payload?.message || 'Kullanıcı postları yüklenirken hata oluştu'; 
      });
  },
});

export const { clearSearch, clearSinglePost } = postSlice.actions;
export default postSlice.reducer;