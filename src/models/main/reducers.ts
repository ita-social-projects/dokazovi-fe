/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { LoadingStatusEnum } from '../../old/lib/types';
import { IMainState } from './types';
import { fetchImportantPosts, fetchNewestPosts } from './asyncActions';
import { getAsyncActionsReducer } from '../helpers/asyncActions';

const initialState: IMainState = {
  important: {
    importantPostIds: [],
    importantPosts: {},
  },
  newest: {
    newestPostIds: [],
    newestPosts: {},
  },
  loading: LoadingStatusEnum.idle,
  error: null,
};

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {},
  extraReducers: {
    ...getAsyncActionsReducer(fetchNewestPosts, 'newest'),
    ...getAsyncActionsReducer(fetchImportantPosts, 'important'),
  },
});

export const {} = mainSlice.actions;

export const mainReducer = mainSlice.reducer;
