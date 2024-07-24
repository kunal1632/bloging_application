import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  blog: null,
  editBlog: false,
  loading: false,
};

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    setBlog: (state, action) => {
      state.blog = action.payload;
    },

    setEditBlog: (state, action) => {
      state.editBlog = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setBlog, setEditBlog, setLoading } = blogSlice.actions;
export default blogSlice.reducer;
