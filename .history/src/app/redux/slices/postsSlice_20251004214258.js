
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

export const likePost = createAsyncThunk(
  "posts/likePost",
  async (postId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        `http://localhost:5000/api/posts/${postId}/like`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return { postId, ...res.data }; // likesCount ve likedByUser
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
      body.append("tags",tags)
      body.append("image", image);
      // FormData için content-type otomatik
    } else {
      body = { title, content, tags };
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

export const searchPosts = createAsyncThunk(
  "posts/searchPosts",
  async ({ q, authorId, tag, startDate, endDate, sort, page, limit }, { rejectWithValue }) => {
    try {
      const params = { q, authorId, tag, startDate, endDate, sort, page, limit };
      const { data } = await axios.get("http://localhost:5000/api/posts/search", { params });
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
  async (postId,{ rejectWithValue })=>{
    try{
      const res = await axios.get(`${API_URL}/${postId}`)
            console.log(res.data)
      return res.data;

    }catch (err){
      return rejectWithValue(err.response?.data || { message: "Getting Post failed " });
    }
  }
);
export const getLikes = createAsyncThunk(
  "posts/getLikes",
  async (postId) => {
    const res = await axios.get(`http://localhost:5000/posts/${postId}/likes`);
    return { postId, data: res.data };
  }
);


const postSlice = createSlice({
  name: 'posts',
  initialState: {
    items: [],
    singlePost:null,
    status: 'idle', 
    error: null,
  },
  reducers: {
    clearSearch: (state) => {
      state.posts = [];
      state.errorPosts = null;
    },
  },
  extraReducers: builder => {
    builder

    .addCase(getLikes.fulfilled, (state, action) => {
        const { postId, data } = action.payload;
        const post = state.posts.find(p => p._id === postId);
        if (post) {
          post.likesCount = data.likesCount;
          post.likedByUsers = data.likedByUsers;
        }
      })
    .addCase(likePost.fulfilled, (state, action) => {
  const { postId, likesCount, likedByUsers, likedByUser } = action.payload;
  
  const index = state.items.findIndex(post => post._id === postId);
  if (index !== -1) {
    // Hem likedByUsers hem de likedByUser için güncelle
    state.items[index] = {
      ...state.items[index],
      likesCount: likesCount,
      likedByUsers: likedByUsers || state.items[index].likedByUsers,
      likedByUser: likedByUser !== undefined ? likedByUser : state.items[index].likedByUser
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

      .addCase(getPostById.fulfilled, (state,action)=>{
        state.status = 'succeeded';
          state.singlePost = action.payload;
      })
      .addCase(getPostById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message || 'Post yüklenirken hata oluştu';
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
      .addCase(searchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(searchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
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

export const { clearSearch } = postSlice.actions;
export default postSlice.reducer;
