import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

// LOGIN
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_URL}/login`, credentials);
      const { _id, username, email, token } = res.data;

      const user = { _id, username, email };

      if (token) localStorage.setItem("token", token);
      if (user) localStorage.setItem("user", JSON.stringify(user));
      console.log(res.data)
      return { token: token || null, user: user || null };
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: "Unknown error" });
    }
  }
);

// Kullanıcıyı localStorage'dan güvenli al
export const getUserFromLocalStorage = () => {
  if (typeof window === "undefined") return null;

  const userItem = localStorage.getItem("user");
  if (!userItem || userItem === "undefined") return null;

  try {
    return JSON.parse(userItem);
  } catch (err) {
    console.error("LocalStorage user parse hatası:", err);
    return null;
  }
};

const initialState = {
  user: null, // SSR sorunları için başlangıçta null
  token: null,
  status: "idle",
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.status = "idle";
      state.error = null;
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    },
    hydrateUser: (state) => {
        if (typeof window !== "undefined") {
          state.user = getUserFromLocalStorage();
          state.token = localStorage.getItem("token");
        }}
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload?.message || "Login failed";
      });
  },
});

export const { logout, hydrateUser } = authSlice.actions;
export default authSlice.reducer;
