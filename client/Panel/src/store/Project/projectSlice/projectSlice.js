import { createSlice } from '@reduxjs/toolkit';

import { getProject } from '../projectThunk/projectThunk';

const initialState = {
  loading: true,
  error: null,
  project: {},
};

export const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    deleteCurrentProject: (state) => {
      state.loading = true;
      state.error = null;
      state.project = {};
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(getProject.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
      .addCase(getProject.fulfilled, (state, action) => {
        state.loading = false;
        state.project = action.payload;
      })
      .addCase(getProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { deleteCurrentProject } = projectSlice.actions; 

export default projectSlice.reducer;
