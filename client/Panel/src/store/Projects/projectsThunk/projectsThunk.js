import { createAsyncThunk } from '@reduxjs/toolkit';

import axios from '../../../utils';

export const getProjects = createAsyncThunk('projects/get', async (params , thunkAPI) => {
  try {
    const response = await axios.get('projects', {params});

    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue({ error: error.message });
  }
});

export const addProjects = createAsyncThunk('projects/post', async (thunkAPI) => {
  try {
    const response = await axios.post('projects');

    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue({ error: error.message });
  }
});
