/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as _ from 'lodash';
import { IPost, IExpert, LoadingStatusEnum } from '../../../lib/types';
import { getPosts, getExperts } from '../../../lib/utilities/API/api';

import type { AppThunkType } from '../../../store/store';
import { LOAD_POSTS_LIMIT } from '../components/constants/newestPostsPagination-config';
import { DIRECTION_PROPERTIES } from '../../../lib/constants/direction-properties';
import { postTypeProperties } from '../../../lib/constants/post-type-properties';
import type { RootStateType } from '../../../store/rootReducer';

const POST_PREVIEW_LENGTH = 150;

interface INewestMeta {
  currentPage: number;
  isLastPage: boolean;
  loading: LoadingStatusEnum;
  error: null | string;
}

interface INewestPostPayload {
  newestPosts: IPost[];
  meta: INewestMeta;
}

interface IFetchNewestPosts {
  loadedPosts: IPost[];
  isLastPage: boolean;
}

interface IImportantMeta {
  loading: LoadingStatusEnum;
  error: null | string;
}

interface IImportantPayload {
  importantPosts: IPost[];
  meta: IImportantMeta;
}
interface IExpertPayload {
  experts: IExpert[];
  meta: IExpertMeta;
}

interface IExpertMeta {
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
    newestPosts: [],
    meta: {
      currentPage: 0,
      isLastPage: false,
      loading: LoadingStatusEnum.idle,
      error: null,
    },
  },
  important: {
    importantPosts: [],
    meta: {
      loading: LoadingStatusEnum.idle,
      error: null,
    },
  },
  experts: {
    experts: [],
    meta: {
      loading: LoadingStatusEnum.idle,
      error: null,
    },
  },
};

export const fetchNewestPosts = createAsyncThunk<IFetchNewestPosts>(
  'main/loadNewest',
  async (__, { getState }) => {
    const {
      main: { newest },
    } = getState() as RootStateType;

    const resp = await getPosts('latest', {
      params: {
        size: LOAD_POSTS_LIMIT,
        page: newest.meta.currentPage,
      },
    });

    const loadedPosts = resp.data.content.map((post) => {
      const postAuthor = {
        ..._.pick(post.author, [
          'avatar',
          'firstName',
          'lastName',
          'mainInstitution',
        ]),
      } as IExpert;

      const preview = _.truncate(post.content, {
        length: POST_PREVIEW_LENGTH,
      });

      return {
        author: postAuthor,
        createdAt: post.createdAt,
        mainDirection: DIRECTION_PROPERTIES[post.mainDirection.id.toString()],
        title: post.title,
        postType: postTypeProperties[post.type.id.toString()],
        preview,
        id: post.id,
      };
    });

    return { loadedPosts, isLastPage: resp.data.last };
  },
);

export const fetchExperts = createAsyncThunk('main/loadExperts', async () => {
  const expertsResp = await getExperts({
    params: {
      size: 11,
    },
  });
  const loadedExperts = expertsResp.data.content.map((expert) => ({
    ...(expert as IExpert),
  }));

  return loadedExperts;
});

export const initialNewestPosts = (): AppThunkType => async (
  dispatch,
  getState,
) => {
  const {
    main: { newest },
  } = getState();

  if (newest.newestPosts.length === 0) {
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

      state.newest.newestPosts.push(...payload.loadedPosts);
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
    const loadedPosts = posts.data.content.map((post) => {
      const postAuthor = _.pick(post.author, [
        'avatar',
        'firstName',
        'id',
        'lastName',
        'mainInstitution',
      ]) as IExpert;
      return {
        author: postAuthor,
        createdAt: post.createdAt,
        mainDirection: DIRECTION_PROPERTIES[post.mainDirection.id.toString()],
        title: post.title,
        postType: postTypeProperties[post.type.id.toString()],
      };
    });
    dispatch(
      loadImportant({
        importantPosts: loadedPosts,
        meta: {
          loading: LoadingStatusEnum.succeeded,
          error: null,
        },
      }),
    );
  } catch (e) {
    dispatch(
      loadImportant({
        importantPosts: [],
        meta: {
          loading: LoadingStatusEnum.failed,
          error: 'Error',
        },
      }),
    );
    console.log(e);
  }
};
