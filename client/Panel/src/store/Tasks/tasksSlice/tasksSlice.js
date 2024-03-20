import { addTasks, getTasks } from '../tasksThunk/tasksThunk';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  error: null,
  tasks: [],
};

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    updateTaskField: (state, action) => {
      const { fieldName, fieldValue, id } = action.payload;

      const indexToUpdate = state.tasks.findIndex((task) => task._id === id);

      if (indexToUpdate !== -1) {
        state.tasks[indexToUpdate][fieldName] = fieldValue;
      }
    },
    updateTasksOrder: (state, action) => {
      state.tasks = action.payload;
    },
    deleteTaskField: (state, action) => {
      state.tasks = state.tasks.filter((task) => task._id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(getTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addTasks.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      });
  },
});

export const { updateTaskField, deleteTaskField, updateTasksOrder } = tasksSlice.actions;

export default tasksSlice.reducer;
