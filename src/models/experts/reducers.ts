/* eslint-disable */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPost, LoadingStatusEnum } from '../../old/lib/types';
import { IExpertsState } from './types';
import { IMaterialsState } from '../materials/types';
import {
  fetchExperts,
  fetchExpertById,
  fetchExpertMaterials,
  fetchInitialMaterials,
} from './asyncActions';
import { getAsyncActionsReducer } from '../../old/store/helpers/asyncActions';
import { fetchMaterials } from '../materials';
// import { getAsyncActionsReducer } from '../helpers/asyncActions';

const initialMaterialsState: IMaterialsState = {
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

const initialState: IExpertsState = {
  data: {
    expertIds: [],
    experts: {},
    meta: {
      totalPages: 0,
      pageNumber: 0,
      loading: LoadingStatusEnum.idle, // will be removed;
      error: null, // will be removed;
      isLastPage: false,
      totalElements: 0,
    },
  },
  loading: LoadingStatusEnum.idle,
  error: null,
  posts: initialMaterialsState,
};

export const expertsSlice = createSlice({
  name: 'experts',
  initialState,
  reducers: {
    resetMaterials: (state) => {
      state.posts = initialMaterialsState;
    },
    loadPosts: (state, action: PayloadAction<IPost[]>) => {
      action.payload.forEach((post) => {
        if (state.posts.data.posts && post.id) {
          state.posts.data.posts[post.id] = post;
        }
      });
    },
  },
  extraReducers: {
    ...getAsyncActionsReducer(fetchExperts as any),
  },
  //     (builder) => {
  //   builder.addCase(fetchExperts.pending, (state) => {
  //     state.data.meta.loading = LoadingStatusEnum.pending;
  //   });
  //   builder.addCase(fetchExperts.fulfilled, (state, { payload }) => {
  //     state.data.meta.loading = LoadingStatusEnum.succeeded;
  //     state.data.meta.pageNumber = payload.pageNumber;
  //     state.data.meta.totalPages = payload.totalPages;
  //     state.data.meta.totalElements = payload.totalElements;
  //     state.data.meta.isLastPage = payload.isLastPage;
  //     state.data.expertIds = payload.appendExperts
  //       ? state.data.expertIds.concat(payload.expertIds)
  //       : payload.expertIds;
  //   });
  //   builder.addCase(fetchExperts.rejected, (state, { error }) => {
  //     if (error.message) {
  //       state.data.meta.error = error.message;
  //     }
  //
  //     state.data.meta.loading = LoadingStatusEnum.failed;
  //   });
  //   builder.addCase(fetchExpertById.pending, (state) => {
  //     state.data.meta.loading = LoadingStatusEnum.pending;
  //   });
  //   builder.addCase(fetchExpertById.fulfilled, (state) => {
  //     state.data.meta.loading = LoadingStatusEnum.succeeded; // TODO add slice for single expert
  //   });
  //   builder.addCase(fetchExpertById.rejected, (state, { error }) => {
  //     if (error.message) {
  //       state.data.meta.error = error.message;
  //     }
  //     state.data.meta.loading = LoadingStatusEnum.failed;
  //   });
  // },
});

export const { resetMaterials, loadPosts } = expertsSlice.actions;

export const expertsReducer = expertsSlice.reducer;
