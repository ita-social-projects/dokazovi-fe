/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  IExpert,
  IAuthInputs,
  LocalStorageKeys,
  LoadingStatusEnum,
} from '../lib/types';
import { getCurrentUser, login } from '../lib/utilities/API/api';

export interface IAuthState {
  user?: IExpert;
  loading: LoadingStatusEnum;
  error: string | null;
}

const initialState: IAuthState = {
  loading: LoadingStatusEnum.idle,
  error: null,
};

export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials?: IAuthInputs) => {
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
      state.loading = LoadingStatusEnum.pending;
      state.error = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = LoadingStatusEnum.succeeded;
      state.user = action.payload;
    });
    builder.addCase(loginUser.rejected, (state, { error }) => {
      state.loading = LoadingStatusEnum.failed;
      if (error.message) {
        state.error = error.message;
      }
    });
  },
});

export const { logOut, clearError } = authSlice.actions;

export default authSlice.reducer;
