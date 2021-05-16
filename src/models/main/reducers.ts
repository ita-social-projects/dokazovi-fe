/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoadingStatusEnum } from '../../old/lib/types';
import { IImportantPostsPayload, IMainState } from './types';
import { fetchImportantPosts, fetchNewestPosts } from './asyncActions';
import { getAsyncActionsReducer } from '../helpers/asyncActions';
import { fetchMaterials } from '../materials';

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

const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    // loadImportant: (state, action: PayloadAction<IImportantPostsPayload>) => {
    //     state.important = action.payload;
    // },
    // setImportantLoadingStatus: (state) => {
    //     state.important.meta.loading = LoadingStatusEnum.pending;
    // },
    // setImportantLoadingError: (
    //     state,
    //     action: PayloadAction<IImportantPostsPayload>,
    // ) => {
    //     state.important.meta.loading = LoadingStatusEnum.failed;
    //     state.important.meta.error = action.payload.meta.error;
  },
  extraReducers: {
    ...getAsyncActionsReducer(fetchNewestPosts, 'newest'),
    ...getAsyncActionsReducer(fetchImportantPosts, 'important'),
  },
  // extraReducers: (builder) => {
  //     builder.addCase(fetchNewestPosts.pending, (state) => {
  //         state.newest.meta.loading = LoadingStatusEnum.pending;
  //     });
  //     builder.addCase(fetchNewestPosts.fulfilled, (state, { payload }) => {
  //         state.newest.meta.loading = LoadingStatusEnum.succeeded;
  //         state.newest.newestPostIds = payload.loadedPostIds;
  //     });
  //     builder.addCase(fetchNewestPosts.rejected, (state, { error }) => {
  //         if (error.message) {
  //             state.newest.meta.error = error.message;
  //         }
  //
  //         state.newest.meta.loading = LoadingStatusEnum.failed;
  //     });
  // },
});

export const {} = mainSlice.actions;

export const mainReducer = mainSlice.reducer;
