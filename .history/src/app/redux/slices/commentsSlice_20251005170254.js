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
      console.log("Deleting commentId:", commentId); // kontrol
      await axios.delete(`${API_URL}/${commentId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return commentId;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: err.message });
    }
  }
);
exports.addReply = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) return res.status(404).json({ message: "Yorum bulunamadı" });
    if (!req.user) return res.status(401).json({ message: "Token yok veya geçersiz" });

    const reply = {
      content: req.body.content,
      author: req.user._id,
    };

    comment.replies.push(reply);
    await comment.save();

    res.status(201).json(reply);
  } catch (err) {
    console.error("ADD REPLY ERROR:", err);
    res.status(500).json({ message: "Sunucu hatası" });
  }
};

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
