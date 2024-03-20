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
    updateProjectField: (state, action) => {
      const { fieldName, fieldValue } = action.payload;

      state.project[fieldName] = fieldValue;
    },
  },
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

export const { updateProjectField } = projectSlice.actions;

export default projectSlice.reducer;
