import { createAsyncThunk } from '@reduxjs/toolkit';

import { deleteProjectReducer } from '../../Projects/projectsSlice/projectsSlice';

import axios from '../../../utils';

export const updateProject = createAsyncThunk('project/update', async (params, thunkAPI) => {
  try {
    await axios.patch(`project/${params.id}`, params);
  } catch (error) {
    return thunkAPI.rejectWithValue({ error: error.message });
  }
});

export const getProject = createAsyncThunk('project/get', async (params, thunkAPI) => {
  try {
    const response = await axios.get(`project/${params.id}`, params);

    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue({ error: error.message });
  }
});

export const deleteProject = createAsyncThunk('projects/delete', async (params, thunkAPI) => {
  try {
    await axios.delete(`project/${params.id}`);

    thunkAPI.dispatch(deleteProjectReducer(params.id));
  } catch (error) {
    return thunkAPI.rejectWithValue({ error: error.message });
  }
});
