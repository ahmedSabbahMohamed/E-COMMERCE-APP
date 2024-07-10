import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "user",
  initialState: {
    isLogin: false,
    user: {},
  },
  reducers: {
    handleLogin: (state, action) => {
      const { user, access_token } = action.payload;
      state.isLogin = true;
      state.user = user;
      localStorage.setItem("token", access_token);
      window.location.pathname = "/";
    },
    handleLogout: (state) => {
      state.isLogin = false;
      state.user = {};
      localStorage.removeItem("token");
    },
  },
});

export const { handleLogin, handleLogout } = authSlice.actions;
export default authSlice.reducer;
