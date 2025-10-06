import { createSlice } from "@reduxjs/toolkit";

// localStorage'dan kullanıcıyı yükle
const loadUserFromLocalStorage = () => {
  if (typeof window === "undefined") {
    return { user: null, token: null };
  }
  
  try {
    const userStr = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    
    console.log("Loading from localStorage - user:", userStr);
    console.log("Loading from localStorage - token:", token ? "exists" : "null");
    
    if (userStr && token) {
      const user = JSON.parse(userStr);
      return { user, token };
    }
    return { user: null, token: null };
  } catch (error) {
    console.error("Error loading user from localStorage:", error);
    return { user: null, token: null };
  }
};

const initialState = loadUserFromLocalStorage();

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: initialState.user,
    token: initialState.token,
    status: "idle",
    error: null,
  },
  reducers: {
    loginSuccess: (state, action) => {
      console.log("Login success - payload:", action.payload);
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.status = "succeeded";
      state.error = null;
      
      // localStorage'a kaydet
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", action.payload.token);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.status = "idle";
      state.error = null;
      
      // localStorage'dan temizle
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
      localStorage.setItem("user", JSON.stringify(state.user));
    },
    setCredentials: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", action.payload.token);
    },
  },
});

export const { loginSuccess, logout, updateUser, setCredentials } = authSlice.actions;
export default authSlice.reducer;