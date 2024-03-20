import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const authLogin = createAsyncThunk('user/login', async (params, thunkAPI) => {
  try {
    const response = await axios.post('http://localhost:4444/auth/login', params);

    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue({ error: error.message });
  }
});

export const authRegister = createAsyncThunk('user/register', async (params, thunkAPI) => {
  try {
    const response = await axios.post('http://localhost:4444/auth/register', params);

    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue({ error: error.message });
  }
});
