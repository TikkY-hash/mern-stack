import { createAsyncThunk } from '@reduxjs/toolkit';
import { updateStatusAndVisibility } from '../../Snackbar/snackbarSlice/snackbarSlice';
import axios from '../../../utils';

export const addSubTasks = createAsyncThunk('subTasks/post', async (params, thunkAPI) => {
  try {
    const response = await axios.post(`/projects/${params.projectId}/tasks/${params.parentTaskId}/subtasks`, params);

    thunkAPI.dispatch(updateStatusAndVisibility({ status: 'success', isShow: true }));
    return response.data;
  } catch (error) {
    thunkAPI.dispatch(updateStatusAndVisibility({ status: 'error', isShow: true }));
    return thunkAPI.rejectWithValue({ error: error.message });
  }
});

export const getSubTasks = createAsyncThunk('subTasks/get', async (params, thunkAPI) => {
  try {
    const response = await axios.get(`/projects/${params.projectId}/tasks/${params.parentTaskId}/subtasks`);

    thunkAPI.dispatch(updateStatusAndVisibility({ status: 'success', isShow: true }));
    return response.data;
  } catch (error) {
    thunkAPI.dispatch(updateStatusAndVisibility({ status: 'error', isShow: true }));
    return thunkAPI.rejectWithValue({ error: error.message });
  }
});
