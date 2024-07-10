import { createSlice } from "@reduxjs/toolkit";

const uploadSlice = createSlice({
  name: "upload",
  initialState: {
    show: false,
    progress: 0,
  },
  reducers: {
    showUploadProgress: (state) => {
      state.show = true;
    },
    hideUploadProgress: (state) => {
      state.show = false;
      state.progress = 0;
    },
    updateUploadProgress: (state, action) => {
      state.progress = action.payload;
    },
  },
});

export const { showUploadProgress, hideUploadProgress, updateUploadProgress } = uploadSlice.actions;
export default uploadSlice.reducer;
