import { createSlice } from '@reduxjs/toolkit';

import { authRegister, authLogin } from '../authThunk/authThunk';

const initialState = {
  token: localStorage.getItem('token') || null,
  loading: false,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetToken: (state) => {
      state.token = null;
      localStorage.removeItem('token');
    },
    resetError: (state) => {
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(authRegister.pending, (state, action) => {
        state.loading = true;
        state.error = null;
        state.token = action.payload;
      })
      .addCase(authRegister.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload;
        localStorage.setItem('token', action.payload);
      })
      .addCase(authRegister.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })
      .addCase(authLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(authLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload;
        localStorage.setItem('token', action.payload);
      })
      .addCase(authLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      });
  },
});

export const { resetToken, resetError } = authSlice.actions;
export default authSlice.reducer;
