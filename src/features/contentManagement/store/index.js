import { createSlice } from "@reduxjs/toolkit";

export const uploadProgress = createSlice({
    name: "upload",
    initialState: {
        progress: {},
    },
    reducers: {
        handleUplaodFiles: (state, action) => {
            const { e } = action.payload;
            state.progress = e;
        },
    },
});

export const { handleUplaodFiles } = uploadProgress.actions;
export default uploadProgress.reducer;
