/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPost, LoadingStatusEnum } from '../../old/lib/types';
import { IMainState } from './types';
import {
  fetchImportantPosts,
  fetchNewestPosts,
  setImportantPosts,
} from './asyncActions';
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
  setImportant: {
    message: '',
    success: false,
  },
  loading: LoadingStatusEnum.idle,
  error: null,
};

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    addToImportant: (state, action: PayloadAction<IPost>) => {
      state.important.importantPostIds.push(action.payload.id);
      state.important.importantPosts[action.payload.id] = action.payload;
    },
    removeFromImportant: (state, action: PayloadAction<IPost>) => {
      state.important.importantPostIds = state.important.importantPostIds.filter(
        (id) => id !== action.payload.id,
      );
      delete state.important.importantPosts[action.payload.id];
    },
    replacePost: (
      state,
      action: PayloadAction<{ previousPosition: number; newPosition: number }>,
    ) => {
      const replacedPostIds = state.important.importantPostIds;
      const postToMove = replacedPostIds[action.payload.previousPosition];

      replacedPostIds[action.payload.previousPosition] =
        replacedPostIds[action.payload.newPosition];
      replacedPostIds[action.payload.newPosition] = postToMove;
      state.important.importantPostIds = replacedPostIds;
    },
    clearSetImportant: (state) => {
      state.setImportant = {
        message: '',
        success: false,
      };
    },
  },
  extraReducers: {
    ...getAsyncActionsReducer(fetchNewestPosts, 'newest'),
    ...getAsyncActionsReducer(fetchImportantPosts, 'important'),
    ...getAsyncActionsReducer(setImportantPosts as any, 'setImportant'),
  },
});

export const {
  addToImportant,
  removeFromImportant,
  replacePost,
  clearSetImportant,
} = mainSlice.actions;

export const mainReducer = mainSlice.reducer;
