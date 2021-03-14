/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IExpert, IInputs, LocalStorageKeys } from '../lib/types';
import { getCurrentUser, login } from '../lib/utilities/API/api';

export interface IAuthState {
  user?: IExpert;
  error: string | null;
}

const initialState: IAuthState = {
  error: null,
};

export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials?: IInputs) => {
    if (credentials) {
      const { email, password } = credentials;
      const token = await login(email, password);

      localStorage.setItem(
        LocalStorageKeys.ACCESS_TOKEN,
        token.data.accessToken,
      );
    }
    const user = await getCurrentUser();
    return user.data;
  },
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logOut: (state) => {
      if (localStorage.getItem(LocalStorageKeys.ACCESS_TOKEN)) {
        localStorage.removeItem(LocalStorageKeys.ACCESS_TOKEN);
      }

      delete state.user;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.error = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(loginUser.rejected, (state, { error }) => {
      if (error.message) {
        state.error = error.message;
      }
    });
  },
});

export const { logOut, clearError } = authSlice.actions;

export default authSlice.reducer;
