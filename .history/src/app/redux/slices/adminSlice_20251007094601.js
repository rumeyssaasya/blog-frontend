import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const isBrowser = typeof window !== "undefined";
const API_URL = "http://localhost:5000/api/admin";

 
export const adminLogin = createAsyncThunk(
  "admin/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${API_URL}/login`, { email, password });
      if (isBrowser) localStorage.setItem("adminToken", data.token);
      return data.token;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: "Giriş başarısız" });
    }
  }
);
 
export const fetchAllUsers = createAsyncThunk(
  "admin/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const token = isBrowser ? localStorage.getItem("adminToken") : null;
      const { data } = await axios.get(`${API_URL}/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: "Kullanıcılar alınamadı" });
    }
  }
);
 
export const fetchAllPosts = createAsyncThunk(
  "admin/fetchPosts",
  async (_, { rejectWithValue }) => {
    try {
      const token = isBrowser ? localStorage.getItem("adminToken") : null;
      const { data } = await axios.get(`${API_URL}/posts`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: "Postlar alınamadı" });
    }
  }
);
 
export const fetchAllComments = createAsyncThunk(
  "admin/fetchComments",
  async (_, { rejectWithValue }) => {
    try {
      const token = isBrowser ? localStorage.getItem("adminToken") : null;
      const { data } = await axios.get(`${API_URL}/comments`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: "Yorumlar alınamadı" });
    }
  }
);
 
export const createPostByAdmin = createAsyncThunk(
  "admin/createPost",
  async ({ title, content, tags, image }, { rejectWithValue }) => {
    try {
      const token = isBrowser ? localStorage.getItem("adminToken") : null;
      let body;
      let headers = { Authorization: `Bearer ${token}` };
      if (image) {
        body = new FormData();
        body.append("title", title);
        body.append("content", content);
        if (Array.isArray(tags)) {
          body.append("tags", tags.join(","));
        } else if (typeof tags === "string") {
          body.append("tags", tags);
        }
        body.append("image", image);
      } else {
        body = { title, content, tags };
        headers["Content-Type"] = "application/json";
      }
      const { data } = await axios.post(`${API_URL}/posts`, body, { headers });
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: "Post oluşturulamadı" });
    }
  }
);
 
export const updatePostByAdmin = createAsyncThunk(
  "admin/updatePost",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const token = isBrowser ? localStorage.getItem("adminToken") : null;
      const { data } = await axios.put(`${API_URL}/posts/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: "Post güncellenemedi" });
    }
  }
);
 
export const updateUserByAdmin = createAsyncThunk(
  "admin/updateUser",
  async ({ id, data: userData }, { rejectWithValue }) => {
    try {
      const token = isBrowser ? localStorage.getItem("adminToken") : null;
      const { data } = await axios.put(`${API_URL}/users/${id}`, userData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: "Kullanıcı güncellenemedi" });
    }
  }
);
 
export const deleteUserByAdmin = createAsyncThunk(
  "admin/deleteUser",
  async (id, { rejectWithValue }) => {
    try {
      const token = isBrowser ? localStorage.getItem("adminToken") : null;
      await axios.delete(`${API_URL}/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: "Kullanıcı silinemedi" });
    }
  }
);

export const deletePostByAdmin = createAsyncThunk(
  "admin/deletePost",
  async (id, { rejectWithValue }) => {
    try {
      const token = isBrowser ? localStorage.getItem("adminToken") : null;
      await axios.delete(`${API_URL}/posts/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: "Post silinemedi" });
    }
  }
);

export const deleteCommentByAdmin = createAsyncThunk(
  "admin/deleteComment",
  async (id, { rejectWithValue }) => {
    try {
      const token = isBrowser ? localStorage.getItem("adminToken") : null;
      await axios.delete(`${API_URL}/comments/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: "Yorum silinemedi" });
    }
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    token: isBrowser ? localStorage.getItem("adminToken") : null,
    adminData: null,
    users: [],
    posts: [],
    comments: [],
    status: "idle",
    error: null,
  },
  reducers: {
    adminLogout: (state) => {
      state.token = null;
      if (isBrowser) localStorage.removeItem("adminToken");
    },
  },
  extraReducers: (builder) => {
    builder
    
    .addCase(adminLogin.fulfilled, (state, action) => {
      state.token = action.payload;
    })

    
    .addCase(fetchAllUsers.fulfilled, (state, action) => {
      state.users = action.payload;
    })

    
    .addCase(fetchAllPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
    })

    
    .addCase(fetchAllComments.pending, (state) => {
      state.status = "loading";
      state.error = null;
    })
    .addCase(fetchAllComments.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.comments = action.payload;
    })
    .addCase(fetchAllComments.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload?.message || "Yorumlar alınamadı";
    })

    
    .addCase(createPostByAdmin.fulfilled, (state, action) => {
      state.posts = [action.payload, ...state.posts];
    })

    
    .addCase(updatePostByAdmin.fulfilled, (state, action) => {
      const idx = state.posts.findIndex(p => p._id === action.payload._id);
      if (idx !== -1) state.posts[idx] = action.payload;
    })

    
    .addCase(deleteUserByAdmin.fulfilled, (state, action) => {
      state.users = state.users.filter((u) => u._id !== action.payload);
    })

    
    .addCase(deletePostByAdmin.fulfilled, (state, action) => {
      state.posts = state.posts.filter((p) => p._id !== action.payload);
    })

    
    .addCase(deleteCommentByAdmin.fulfilled, (state, action) => {
      state.comments = state.comments.filter((c) => c._id !== action.payload);
    })

    
    .addCase(updateUserByAdmin.fulfilled, (state, action) => {
      const idx = state.users.findIndex(u => u._id === action.payload._id);
      if (idx !== -1) state.users[idx] = action.payload;
    });

  },
});

export const { adminLogout } = adminSlice.actions;
export default adminSlice.reducer;
