import { createSlice } from "@reduxjs/toolkit";
import swal from "sweetalert";

export const authSlice = createSlice({
  name: "user",
  initialState: {
    isLogin: false,
    user: {},
  },
  reducers: {
    handleLogin: (state, action) => {
      const { user , access_token } = action.payload
      state.isLogin = true;
      state.user = user;
      localStorage.setItem("token", access_token);
      swal("signedin successfully").then(() => {
        window.location.pathname = "/";
      });
    },
    handleLogout: (state) => {
      state.isLogin = false;
      state.user = {};
    },
  },
});

export const { handleLogin, handleLogout } = authSlice.actions;
export default authSlice.reducer;
