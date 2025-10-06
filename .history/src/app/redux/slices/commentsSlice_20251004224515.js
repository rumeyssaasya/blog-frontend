import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/api/comments";

// --- Async Thunks ---
export const getComments = createAsyncThunk("comments/getComments", async (postId) => {
  const res = await axios.get(`${API_URL}/${postId}`);
  return { postId, comments: res.data };
});

export const addComment = createAsyncThunk("comments/addComment", async ({ postId, content }) => {
  const token = localStorage.getItem("token");
  const res = await axios.post(
    `${API_URL}/${postId}`,
    { content },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
});

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
      return rejectWithValue(err.response?.data || { message: err });
    }
  }
);

export const addReply = createAsyncThunk("comments/addReply", async ({ commentId, content }) => {
  const token = localStorage.getItem("token");
  const res = await axios.post(
    `${API_URL}/reply/${commentId}`,
    { content },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return { commentId, reply: res.data };
});

export const deleteReply = createAsyncThunk("comments/deleteReply", async ({ commentId, replyId }) => {
  const token = localStorage.getItem("token");
  await axios.delete(`${API_URL}/${commentId}/replies/${replyId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return { commentId, replyId };
});

// --- Slice ---
const commentsSlice = createSlice({
  name: "comments",
  initialState: { comments: [], loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getComments.pending, (state) => { state.loading = true; })
      .addCase(getComments.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload.comments;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.comments.push(action.payload);
      })
        .addCase(deleteComment.fulfilled, (state, action) => {
        state.comments = state.comments.filter(c => c._id !== action.payload);
        })
      .addCase(addReply.fulfilled, (state, action) => {
        const comment = state.comments.find(c => c._id === action.payload.commentId);
        if (comment) {
          comment.replies.push(action.payload.reply);
        }
      })
      .addCase(deleteReply.fulfilled, (state, action) => {
        const comment = state.comments.find(c => c._id === action.payload.commentId);
        if (comment) {
          comment.replies = comment.replies.filter(r => r._id !== action.payload.replyId);
        }
      });
  },
});

export default commentsSlice.reducer;
