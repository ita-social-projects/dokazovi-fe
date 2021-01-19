/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IExpert, LoadingStatusEnum } from '../../../lib/types';
import { getPosts, getExperts } from '../../../lib/utilities/API/api';

import type { AppThunkType } from '../../../store/store';
import { LOAD_POSTS_LIMIT } from '../components/constants/newestPostsPagination-config';
import type { RootStateType } from '../../../store/rootReducer';
import { loadPosts, mapFetchedPosts } from '../../../store/dataSlice';

interface INewestMeta {
  currentPage: number;
  isLastPage: boolean;
  loading: LoadingStatusEnum;
  error: null | string;
}

interface INewestPostPayload {
  newestPostsIds: string[];
  meta: INewestMeta;
}

interface IFetchNewestPosts {
  loadedPostsIds: string[];
  isLastPage: boolean;
}

interface IImportantMeta {
  loading: LoadingStatusEnum;
  error: null | string;
}

interface IImportantPayload {
  importantPostsIds: string[];
  meta: IImportantMeta;
}
export interface IExpertPayload {
  experts: IExpert[];
  meta: IExpertMeta;
}

export interface IExpertMeta {
  totalPages?: number;
  pageNumber?: number;
  loading: LoadingStatusEnum;
  error: null | string;
}

export interface IMainState {
  newest: INewestPostPayload;
  important: IImportantPayload;
  experts: IExpertPayload;
}

const initialState: IMainState = {
  newest: {
    newestPostsIds: [],
    meta: {
      currentPage: 0,
      isLastPage: false,
      loading: LoadingStatusEnum.idle,
      error: null,
    },
  },
  important: {
    importantPostsIds: [],
    meta: {
      loading: LoadingStatusEnum.idle,
      error: null,
    },
  },
  experts: {
    experts: [],
    meta: {
      pageNumber: 0,
      loading: LoadingStatusEnum.idle,
      error: null,
    },
  },
};

export const fetchNewestPosts = createAsyncThunk<IFetchNewestPosts>(
  'main/loadNewest',
  async (__, { dispatch, getState }) => {
    const {
      main: { newest },
    } = getState() as RootStateType;

    const resp = await getPosts('latest', {
      params: {
        size: LOAD_POSTS_LIMIT,
        page: newest.meta.currentPage,
      },
    });

    const { mappedPosts, ids } = mapFetchedPosts(resp.data.content);
    dispatch(loadPosts(mappedPosts));

    return { loadedPostsIds: ids, isLastPage: resp.data.last };
  },
);

export const fetchExperts = createAsyncThunk('main/loadExperts', async () => {
  const {
    data: { content: fetchedExperts },
  } = await getExperts({
    params: {
      size: 11,
    },
  });

  return fetchedExperts;
});

export const fetchInitialNewestPosts = (): AppThunkType => async (
  dispatch,
  getState,
) => {
  const {
    main: { newest },
  } = getState();

  if (!newest.newestPostsIds.length) {
    await dispatch(fetchNewestPosts());
  }
};

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    loadImportant: (state, action: PayloadAction<IImportantPayload>) => {
      state.important = action.payload;
    },
    setImportantLoadingStatus: (state) => {
      state.important.meta.loading = LoadingStatusEnum.pending;
    },
    setImportantLoadingError: (
      state,
      action: PayloadAction<IImportantPayload>,
    ) => {
      state.important.meta.loading = LoadingStatusEnum.failed;
      state.important.meta.error = action.payload.meta.error;
    },
    loadExperts: (state, action: PayloadAction<IExpertPayload>) => {
      state.experts = action.payload;
    },
    loadNewest: (state, action: PayloadAction<INewestPostPayload>) => {
      state.newest = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchNewestPosts.pending, (state) => {
      state.newest.meta.loading = LoadingStatusEnum.pending;
    });
    builder.addCase(fetchNewestPosts.fulfilled, (state, { payload }) => {
      state.newest.meta.currentPage += 1;
      state.newest.meta.isLastPage = payload.isLastPage;

      state.newest.meta.loading = LoadingStatusEnum.succeeded;

      state.newest.newestPostsIds.push(...payload.loadedPostsIds);
    });
    builder.addCase(fetchNewestPosts.rejected, (state, { error }) => {
      if (error.message) {
        state.newest.meta.error = error.message;
      }

      state.newest.meta.loading = LoadingStatusEnum.failed;
    });
    builder.addCase(fetchExperts.pending, (state) => {
      state.experts.meta.loading = LoadingStatusEnum.pending;
    });
    builder.addCase(fetchExperts.fulfilled, (state, { payload }) => {
      state.experts.meta.loading = LoadingStatusEnum.succeeded;
      state.experts.experts = payload;
    });
    builder.addCase(fetchExperts.rejected, (state, { error }) => {
      if (error.message) {
        state.experts.meta.error = error.message;
      }

      state.experts.meta.loading = LoadingStatusEnum.failed;
    });
  },
});

export const {
  loadImportant,
  loadExperts,
  loadNewest,
  setImportantLoadingStatus,
} = mainSlice.actions;

export default mainSlice.reducer;

export const fetchImportantPosts = (): AppThunkType => async (dispatch) => {
  try {
    const posts = await getPosts('important', {
      params: {
        size: 20,
      },
    });

    const { mappedPosts, ids } = mapFetchedPosts(posts.data.content);

    dispatch(loadPosts(mappedPosts));

    dispatch(
      loadImportant({
        importantPostsIds: ids,
        meta: {
          loading: LoadingStatusEnum.succeeded,
          error: null,
        },
      }),
    );
  } catch (e) {
    dispatch(
      loadImportant({
        importantPostsIds: [],
        meta: {
          loading: LoadingStatusEnum.failed,
          error: 'Error',
        },
      }),
    );
    console.log(e);
  }
};
