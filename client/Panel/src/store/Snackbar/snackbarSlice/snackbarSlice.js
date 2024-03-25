import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isShow: false,
  status: null,
};

export const snackbarSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateStatusAndVisibility: (state, action) => {
      state.status = action.payload.status;
      state.isShow = action.payload.isShow;
    },
  },
});

export const { updateStatusAndVisibility } = snackbarSlice.actions;
export default snackbarSlice.reducer;
