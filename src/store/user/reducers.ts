/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { LoadingStatusEnum } from '../../lib/types';
import { IUserState } from './types';
import { getUserAsyncAction } from './asyncActions';
import { getAsyncActionsReducer } from '../helpers/asyncActions';

const initialState: IUserState = {
  loading: LoadingStatusEnum.idle,
  error: null,
};

const signInSlice = createSlice({
  name: 'signIn',
  initialState,
  reducers: {
    signOutAction: (state) => {
      delete state.data;
    },
  },
  extraReducers: {
    ...getAsyncActionsReducer(getUserAsyncAction),
  },
});

const { signOutAction } = signInSlice.actions;
const signInReducer = signInSlice.reducer;

export { signInReducer, signOutAction };
