import { createAsyncThunk } from '@reduxjs/toolkit';
import { updateStatusAndVisibility } from '../../Snackbar/snackbarSlice/snackbarSlice';

import axios from '../../../utils';

export const getProject = createAsyncThunk('project/get', async (params, thunkAPI) => {
  try {
    const response = await axios.get(`project/${params.id}`, params);

    thunkAPI.dispatch(updateStatusAndVisibility({ status: 'success', isShow: true }));
    return response.data;
  } catch (error) {
    thunkAPI.dispatch(updateStatusAndVisibility({ status: 'error', isShow: true }));
    return thunkAPI.rejectWithValue({ error: error.message });
  }
});
