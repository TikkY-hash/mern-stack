import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { updateStatusAndVisibility } from '../../Snackbar/snackbarSlice/snackbarSlice';

export const authLogin = createAsyncThunk('user/login', async (params, thunkAPI) => {
  try {
    const response = await axios.post('http://localhost:4444/auth/login', params);

    thunkAPI.dispatch(updateStatusAndVisibility({ status: 'success', isShow: true }));

    return response.data;
  } catch (error) {
    thunkAPI.dispatch(updateStatusAndVisibility({ status: 'error', isShow: true }));
    return thunkAPI.rejectWithValue({ error: error.message });
  }
});

export const authRegister = createAsyncThunk('user/register', async (params, thunkAPI) => {
  try {
    const response = await axios.post('http://localhost:4444/auth/register', params);

    thunkAPI.dispatch(updateStatusAndVisibility({ status: 'success', isShow: true }));

    return response.data;
  } catch (error) {
    thunkAPI.dispatch(updateStatusAndVisibility({ status: 'error', isShow: true }));
    return thunkAPI.rejectWithValue({ error: error.message });
  }
});
