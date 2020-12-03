/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as _ from 'lodash';
import { IPost, IExpert, LoadingStatusEnum } from '../../../lib/types';
import { getPosts, getExperts } from '../../../lib/utilities/API/api';
import MOCK_EXPERTS from '../mockDataExperts';
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

export interface IMainState {
  newest: INewestPostPayload;
  important: IPost[];
  experts: IExpert[];
}

const initialState: IMainState = {
  newest: {
    newestPosts: [],
    meta: {
      currentPage: 0,
      isLastPage: false,
      loading: LoadingStatusEnum.iddle,
      error: null,
    },
  },
  important: [],
  experts: [],
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

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    loadImportant: (state, action: PayloadAction<IPost[]>) => {
      state.important = action.payload;
    },
    loadExperts: (state, action: PayloadAction<IExpert[]>) => {
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
  },
});

export const { loadImportant, loadExperts, loadNewest } = mainSlice.actions;

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
    dispatch(loadImportant(loadedPosts));
  } catch (e) {
    console.log(e);
  }
};

export const fetchExperts = (): AppThunkType => async (dispatch) => {
  try {
    const experts = await getExperts({
      params: {
        size: 11,
      },
    });
    const loadedExperts = experts.data.content.map((expert) => {
      const {
        firstName,
        lastName,
        mainDirection,
        avatar,
        id,
        lastAddedPost,
        mainInstitution,
      } = expert;
      return {
        firstName,
        lastName,
        mainDirection,
        avatar,
        id,
        lastAddedPost,
        mainInstitution,
      };
    });

    dispatch(loadExperts(loadedExperts));
  } catch (e) {
    console.log(e);
  }
};
