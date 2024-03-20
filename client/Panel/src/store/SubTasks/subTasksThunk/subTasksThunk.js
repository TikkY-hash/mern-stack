import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../utils';

export const addSubTasks = createAsyncThunk('subTasks/post', async (params, thunkAPI) => {
  try {
    const response = await axios.post(`/projects/${params.projectId}/tasks/${params.parentTaskId}/subtasks`);

    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue({ error: error.message });
  }
});

export const getSubTasks = createAsyncThunk('subTasks/get', async (params, thunkAPI) => {
  try {
    const response = await axios.get(`/projects/${params.projectId}/tasks/${params.parentTaskId}/subtasks`);

    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue({ error: error.message });
  }
});
