import { addProjects, getProjects } from '../projectsThunk/projectsThunk';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  error: null,
  projects: [],
};

export const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    deleteProjectReducer: (state, action) => {
      const projectId = action.payload;
      state.projects = state.projects.filter((project) => project._id !== projectId);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload;
      })
      .addCase(getProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addProjects.fulfilled, (state, action) => {
        state.projects.push(action.payload);
      });
  },
});

export const { deleteProjectReducer } = projectsSlice.actions;

export default projectsSlice.reducer;
