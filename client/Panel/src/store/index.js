import { configureStore } from '@reduxjs/toolkit';
import authSliceReducer from './Users/authSlice/authSlice';
import projectsSliceReducer from './Projects/projectsSlice/projectsSlice';
import projectSliceReducer from './Project/projectSlice/projectSlice';
import tasksSliceReducer from './Tasks/tasksSlice/tasksSlice';
import subTasksSliceReducer from './SubTasks/subTasksSlice/subTasksSlice';
import snackbarReducer from './Snackbar/snackbarSlice/snackbarSlice';

export const store = configureStore({
  reducer: {
    auth: authSliceReducer,
    projects: projectsSliceReducer,
    project: projectSliceReducer,
    tasks: tasksSliceReducer,
    subTasks: subTasksSliceReducer,
    snackbar: snackbarReducer,
  },
});
