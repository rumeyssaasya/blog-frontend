import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'; 
import axios from 'axios'; 
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => { 
    const res = await axios.get('http://localhost:5000/api/posts'); 
    return res.data; }); 
    const postSlice = createSlice({ name: 'posts', initialState: { items: [], status: 'idle', 
         idle, loading, succeeded, failed error: null, }, 
         reducers: {}, 
         extraReducers: (builder) => { 
            builder .addCase(fetchPosts.pending, 
                (state) => { state.status = 'loading'; }) .addCase(fetchPosts.fulfilled, 
                    (state, action) => { state.status = 'succeeded'; state.items = action.payload; }) .addCase(fetchPosts.rejected, 
                        (state, action) => { state.status = 'failed'; state.error = action.error.message;

             }); 
        }, 
        }); 
            export default postSlice.reducer;