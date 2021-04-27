/* eslint-disable */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPost, LoadingStatusEnum } from '../../lib/types';
import { PostResponseType } from '../../lib/utilities/API/types';
import { IMaterialsState } from './types';
import { fetchMaterials } from './asyncActions';
import { getAsyncActionsReducer } from '../helpers/asyncActions';

const initialState: IMaterialsState = {
  data: {
    postIds: [],
    posts: {},
    meta: {
      isLastPage: false,
      loading: LoadingStatusEnum.idle,
      error: null,
      pageNumber: 0,
      totalElements: 0,
      totalPages: 0,
    },
  },
  loading: LoadingStatusEnum.idle,
  error: null,
  filters: {},
};

export const mapFetchedPosts = (
  posts: PostResponseType[],
): { mappedPosts: IPost[]; ids: number[] } => {
  const ids: number[] = posts.map((post) => post.id);

  return { mappedPosts: posts, ids };
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

  // extraReducers: (builder) => {
  //   builder.addCase(fetchMaterials.pending, (state) => {
  //     state.meta.loading = LoadingStatusEnum.pending;
  //   });
  //   builder.addCase(fetchMaterials.fulfilled, (state, { payload }) => {
  //     const { mappedPosts, ids } = mapFetchedPosts(payload.data.content);
  //
  //     mappedPosts.forEach((post) => {
  //       if (state.posts && post.id) {
  //         state.posts[post.id] = post;
  //       }
  //     });
  //
  //     state.postIds = payload.appendPosts ? state.postIds.concat(ids) : ids;
  //     state.meta = {
  //       totalPages: payload.data.totalPages,
  //       totalElements: payload.data.totalElements,
  //       pageNumber: payload.data.number,
  //       isLastPage: payload.data.last,
  //       loading: LoadingStatusEnum.succeeded,
  //       error: null,
  //     };
  //   });
  //   builder.addCase(fetchMaterials.rejected, (state, { error }) => {
  //     state.meta.loading = LoadingStatusEnum.failed;
  //     if (error.message) {
  //       state.meta.error = error.message;
  //     }
  //   });
  // },
});

export const { loadPosts } = reducers.actions;

export const materialsReducer = reducers.reducer;
