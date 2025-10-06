import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/api/comments";

// --- Async Thunks ---
export const getComments = createAsyncThunk(
  "comments/getComments",
  async (postId) => {
    const res = await axios.get(`${API_URL}/post/${postId}`);
    return res.data; // direkt yorum dizisi
  }
);

export const addComment = createAsyncThunk(
  "comments/addComment",
  async ({ postId, content }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${API_URL}/${postId}`,
        { content },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data; // yeni comment objesi
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: err.message });
    }
  }
);

export const deleteComment = createAsyncThunk(
  "comments/deleteComment",
  async (commentId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_URL}/${commentId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return commentId;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: err.message });
    }
  }
);

export const addReply = createAsyncThunk(
  "comments/addReply",
  async ({ commentId, content }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${API_URL}/reply/${commentId}`,
        { content },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return { commentId, reply: res.data }; // res.data içinde author var
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: err.message });
    }
  }
);

export const deleteReply = createAsyncThunk(
  "comments/deleteReply",
  async ({ commentId, replyId }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_URL}/${commentId}/replies/${replyId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return { commentId, replyId };
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: err.message });
    }
  }
);

// --- Slice ---
const commentsSlice = createSlice({
  name: "comments",
  initialState: {
    comments: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get Comments
      .addCase(getComments.pending, (state) => { state.loading = true; })
      .addCase(getComments.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload.reverse(); // en son eklenen üstte
      })
      .addCase(getComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add Comment
      .addCase(addComment.fulfilled, (state, action) => {
        state.comments.unshift(action.payload); // en üstte göster
      })

      // Delete Comment
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.comments = state.comments.filter(c => c._id !== action.payload);
      })

      // Add Reply
      .addCase(addReply.fulfilled, (state, action) => {
        const comment = state.comments.find(c => c._id === action.payload.commentId);
        if (comment) {
          comment.replies.push(action.payload.reply);
        }
      })

      // Delete Reply
      .addCase(deleteReply.fulfilled, (state, action) => {
        const comment = state.comments.find(c => c._id === action.payload.commentId);
        if (comment) {
          comment.replies = comment.replies.filter(r => r._id !== action.payload.replyId);
        }
      });
  },
});

export default commentsSlice.reducer;
