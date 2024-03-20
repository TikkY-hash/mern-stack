import axios from '../../../utils';

import { createAsyncThunk } from '@reduxjs/toolkit';

export const getTasks = createAsyncThunk('tasks/get', async (params, thunkAPI) => {
  try {
    const response = await axios.get(`/projects/${params.id}/tasks`, { params });

    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue({ error: error.message });
  }
});

export const addTasks = createAsyncThunk('tasks/post', async (params, thunkAPI) => {
  try {
    const tasks = thunkAPI.getState().tasks.tasks;

    let pos = 0;

    if (tasks.length) pos = tasks[tasks.length - 1].pos + 1;

    const response = await axios.post(`/projects/${params.id}/tasks`, { pos });

    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue({ error: error.message });
  }
});

export const updateTask = createAsyncThunk('tasks/update', async (params, thunkAPI) => {
  try {
    await axios.patch(`/projects/tasks/${params.id}`, params);
  } catch (error) {
    return thunkAPI.rejectWithValue({ error: error.message });
  }
});

export const deleteTask = createAsyncThunk('tasks/delete', async (params, thunkAPI) => {
  try {
    await axios.delete(`/projects/tasks/${params.id}`);
  } catch (error) {
    return thunkAPI.rejectWithValue({ error: error.message });
  }
});
