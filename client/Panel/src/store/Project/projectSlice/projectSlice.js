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
  extraReducers: (builder) => {
    builder
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

export default projectSlice.reducer;
