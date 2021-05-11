/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoadingStatusEnum } from '../../../lib/types';
import { getPosts } from '../../../lib/utilities/API/api';
import { loadPosts, mapFetchedPosts } from '../../../../models/materials';
import {
  LOAD_POSTS_LIMIT,
  LOAD_IMPORTANT_POSTS_LIMIT,
} from '../../../lib/constants/posts';

interface INewestPostsMeta {
  loading: LoadingStatusEnum;
  error: null | string;
}

interface INewestPostsPayload {
  newestPostIds: number[];
  meta: INewestPostsMeta;
}

interface IFetchNewestPosts {
  loadedPostIds: number[];
}

interface IImportantPostsMeta {
  loading: LoadingStatusEnum;
  error: null | string;
}

interface IImportantPostsPayload {
  importantPostIds: number[];
  meta: IImportantPostsMeta;
}

export interface IMainState {
  newest: INewestPostsPayload;
  important: IImportantPostsPayload;
}

const initialState: IMainState = {
  important: {
    importantPostIds: [],
    meta: {
      loading: LoadingStatusEnum.idle,
      error: null,
    },
  },
  newest: {
    newestPostIds: [],
    meta: {
      loading: LoadingStatusEnum.idle,
      error: null,
    },
  },
};

export const fetchNewestPosts = createAsyncThunk<IFetchNewestPosts>(
  'main/loadNewestPosts',
  async (_, { dispatch }) => {
    const resp = await getPosts('latest', {
      params: {
        size: LOAD_POSTS_LIMIT,
      },
    });

    const { mappedPosts, ids } = mapFetchedPosts(resp.data.content);

    dispatch(loadPosts(mappedPosts));

    return { loadedPostIds: ids };
  },
);

export const fetchImportantPosts = createAsyncThunk(
  'main/loadImportantPosts',
  async (_, { dispatch }) => {
    try {
      const posts = await getPosts('important', {
        params: {
          size: LOAD_IMPORTANT_POSTS_LIMIT,
        },
      });

      const { mappedPosts, ids } = mapFetchedPosts(posts.data.content);

      dispatch(loadPosts(mappedPosts));

      dispatch(
        loadImportant({
          importantPostIds: ids,
          meta: {
            loading: LoadingStatusEnum.succeeded,
            error: null,
          },
        }),
      );
    } catch (e) {
      dispatch(
        loadImportant({
          importantPostIds: [],
          meta: {
            loading: LoadingStatusEnum.failed,
            error: String(e),
          },
        }),
      );
    }
  },
);

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    loadImportant: (state, action: PayloadAction<IImportantPostsPayload>) => {
      state.important = action.payload;
    },
    setImportantLoadingStatus: (state) => {
      state.important.meta.loading = LoadingStatusEnum.pending;
    },
    setImportantLoadingError: (
      state,
      action: PayloadAction<IImportantPostsPayload>,
    ) => {
      state.important.meta.loading = LoadingStatusEnum.failed;
      state.important.meta.error = action.payload.meta.error;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchNewestPosts.pending, (state) => {
      state.newest.meta.loading = LoadingStatusEnum.pending;
    });
    builder.addCase(fetchNewestPosts.fulfilled, (state, { payload }) => {
      state.newest.meta.loading = LoadingStatusEnum.succeeded;
      state.newest.newestPostIds = payload.loadedPostIds;
    });
    builder.addCase(fetchNewestPosts.rejected, (state, { error }) => {
      if (error.message) {
        state.newest.meta.error = error.message;
      }

      state.newest.meta.loading = LoadingStatusEnum.failed;
    });
  },
});

export const { loadImportant, setImportantLoadingStatus } = mainSlice.actions;

export default mainSlice.reducer;
