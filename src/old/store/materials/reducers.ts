/* eslint-disable */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPost, LoadingStatusEnum } from '../../lib/types';
import { IMaterialsState } from './types';
import { fetchMaterials } from './asyncActions';
import { getAsyncActionsReducer } from '../helpers/asyncActions';

const initialState: IMaterialsState = {
  data: {
    postIds: [],
    posts: {},
    meta: {
      isLastPage: false,
      loading: LoadingStatusEnum.idle, // will be removed;
      error: null, // will be removed;
      pageNumber: 0,
      totalElements: 0,
      totalPages: 0,
    },
  },
  loading: LoadingStatusEnum.idle,
  error: null,
  filters: {},
};

export const reducers = createSlice({
  name: 'materials',
  initialState,
  reducers: {
    loadPosts: (state, action: PayloadAction<IPost[]>) => {
      action.payload.forEach((post) => {
        if (state.data.posts && post.id) {
          state.data.posts[post.id] = post;
        }
      });
    },
  },
  extraReducers: {
    ...getAsyncActionsReducer(fetchMaterials as any),
  },
});

export const { loadPosts } = reducers.actions;

export const materialsReducer = reducers.reducer;
