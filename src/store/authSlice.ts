/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IInputs, LocalStorageKeys } from '../lib/types';
import { getCurrentUser, loginService } from '../lib/utilities/API/api';
import { ExpertResponseType } from '../lib/utilities/API/types';

export interface IAuthState {
  user?: ExpertResponseType;
  error: null | string;
}

const initialState: IAuthState = {
  error: null,
};

export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials?: IInputs) => {
    if (credentials) {
      const { email, password } = credentials;
      const token = await loginService(email, password);

      localStorage.setItem(
        LocalStorageKeys.ACCESS_TOKEN,
        token.data.accessToken,
      );
    }

    const user = await getCurrentUser();
    console.log('user', user);

    return user;
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
