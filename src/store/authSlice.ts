/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IInputs } from '../lib/components/Modals/RegistrationModal';
import { LocalStorageKeys } from '../lib/types';
import { getCurrentUser, loginService } from '../lib/utilities/API/api';
import { ExpertResponseType } from '../lib/utilities/API/types';

export interface IAuthState {
  user?: ExpertResponseType;
}

const initialState: IAuthState = {};

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
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.user = action.payload.data;
    });
    builder.addCase(loginUser.rejected, (__, { error }) => {
      console.log(error);
    });
  },
});

export const { logOut } = authSlice.actions;

export default authSlice.reducer;
