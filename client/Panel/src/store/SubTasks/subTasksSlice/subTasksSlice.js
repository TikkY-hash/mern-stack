import { addSubTasks, getSubTasks } from '../subTasksThunk/subTasksThunk';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  error: null,
  subTasks: {},
};

export const subTasksSlice = createSlice({
  name: 'subTasks',
  initialState,
  reducers: {
    deleteSubTaskField: (state, action) => {
      const { parentTaskId, subTaskId } = action.payload;

      state.subTasks[parentTaskId] = state.subTasks[parentTaskId].filter((subTask) => subTask._id !== subTaskId);
    },
    updateSubTaskField: (state, action) => {
      const { parentTaskId, subTaskId, fieldName, fieldValue } = action.payload;

      if (state.subTasks[parentTaskId]) {
        const subTaskToUpdate = state.subTasks[parentTaskId].find((subTask) => subTask._id === subTaskId);

        if (subTaskToUpdate) {
          subTaskToUpdate[fieldName] = fieldValue;
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSubTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSubTasks.fulfilled, (state, action) => {
        state.loading = false;

        const parentTaskId = action.payload[0]?.parentTask;

        if (!state.subTasks[parentTaskId]) {
          state.subTasks[parentTaskId] = [];
        }

        state.subTasks[parentTaskId] = action.payload;
      })
      .addCase(getSubTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addSubTasks.fulfilled, (state, action) => {
        const parentTaskId = action.payload.parentTask;

        if (!state.subTasks[parentTaskId]) {
          state.subTasks[parentTaskId] = [];
        }

        state.subTasks[parentTaskId].push(action.payload);
      });
  },
});

export const { updateSubTaskField, deleteSubTaskField } = subTasksSlice.actions;
export default subTasksSlice.reducer;
