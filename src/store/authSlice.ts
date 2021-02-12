/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IInputs, LocalStorageKeys } from '../lib/types';
import {
  getCurrentUser,
  loginService,
  loginGoogle,
  loginFacebook,
} from '../lib/utilities/API/api';
import { ExpertResponseType } from '../lib/utilities/API/types';
import { GOOGLE_AUTH_URL, FACEBOOK_AUTH_URL } from '../apiURL';

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

    return user;
  },
);

export const loginUserGoogle = createAsyncThunk(GOOGLE_AUTH_URL, async () => {
  const token = await loginGoogle();
  localStorage.setItem(LocalStorageKeys.ACCESS_TOKEN, token.data.token);
  const user = await getCurrentUser();

  return user;
});

export const loginUserFacebook = createAsyncThunk(
  FACEBOOK_AUTH_URL,
  async () => {
    const token = await loginFacebook();
    localStorage.setItem(LocalStorageKeys.ACCESS_TOKEN, token.data.token);
    const user = await getCurrentUser();

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
      state.user = action.payload.data;
    });
    builder.addCase(loginUser.rejected, (state, { error }) => {
      if (error.message) {
        state.error = error.message;
      }
    });
    builder.addCase(loginUserGoogle.pending, (state) => {
      state.error = null;
    });
    builder.addCase(loginUserGoogle.fulfilled, (state, action) => {
      state.user = action.payload.data;
    });
    builder.addCase(loginUserGoogle.rejected, (state, { error }) => {
      if (error.message) {
        state.error = error.message;
      }
    });
    builder.addCase(loginUserFacebook.pending, (state) => {
      state.error = null;
    });
    builder.addCase(loginUserFacebook.fulfilled, (state, action) => {
      state.user = action.payload.data;
    });
    builder.addCase(loginUserFacebook.rejected, (state, { error }) => {
      if (error.message) {
        state.error = error.message;
      }
    });
  },
});

export const { logOut, clearError } = authSlice.actions;

export default authSlice.reducer;
