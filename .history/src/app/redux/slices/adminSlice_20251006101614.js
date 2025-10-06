import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/User.js";
import Post from "../models/Post.js";
import Comment from "../models/Comment.js";

dotenv.config();
const router = express.Router();

const isBrowser = typeof window !== "undefined";
const API_URL = "http://localhost:5000/api/admin";

// 🔹 ADMIN LOGIN
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

// 🔹 TÜM KULLANICILAR
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

// 🔹 TÜM POSTLAR
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

// 🔹 TÜM YORUMLAR
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

// 🔹 SİLME İŞLEMLERİ
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
      .addCase(fetchAllComments.fulfilled, (state, action) => {
        state.comments = action.payload;
      })
      .addCase(deleteUserByAdmin.fulfilled, (state, action) => {
        state.users = state.users.filter((u) => u._id !== action.payload);
      })
      .addCase(deletePostByAdmin.fulfilled, (state, action) => {
        state.posts = state.posts.filter((p) => p._id !== action.payload);
      })
      .addCase(deleteCommentByAdmin.fulfilled, (state, action) => {
        state.comments = state.comments.filter((c) => c._id !== action.payload);
      });
  },
});

export const { adminLogout } = adminSlice.actions;
export default adminSlice.reducer;
