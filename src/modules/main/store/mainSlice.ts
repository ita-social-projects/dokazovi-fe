/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as _ from 'lodash';
import {
  IPost,
  IExpert,
  DirectionEnum,
  PostTypeEnum,
} from '../../../lib/types';
import { getPosts } from '../../../lib/utilities/API/api';
import MOCK_EXPERTS from '../mockDataExperts';
import type { AppThunkType } from '../../../store/store';
import { LOAD_POSTS_LIMIT } from '../components/constants/newestPostsPagination-config';
import type { RootStateType } from '../../../store/rootReducer';

const POST_PREVIEW_LENGTH = 150;

interface IMeta {
  currentPage: number;
  isLastPage?: boolean;
}

interface INewestPostPayload {
  newestPosts: IPost[];
  meta: IMeta;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: null | string | undefined;
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
    },
    loading: 'idle',
    error: null,
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
      const postAuthor = _.pick(post.author, [
        'avatar',
        'firstName',
        'lastName',
        'mainInstitution',
      ]) as IExpert;
      return {
        author: { ...postAuthor, workPlace: postAuthor.mainInstitution?.name },
        createdAt: post.createdAt,
        direction: post.mainDirection.name as DirectionEnum,
        title: post.title,
        postType: post.type.name as PostTypeEnum,
        preview: _.truncate(post.content, {
          length: POST_PREVIEW_LENGTH,
        }),
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
      state.newest.loading = 'pending';
    });
    builder.addCase(fetchNewestPosts.fulfilled, (state, action) => {
      state.newest.meta.currentPage += 1;
      state.newest.meta.isLastPage = action.payload.isLastPage;

      state.newest.loading = 'succeeded';

      state.newest.newestPosts.push(...action.payload.loadedPosts);
    });
    builder.addCase(fetchNewestPosts.rejected, (state, action) => {
      state.newest.error = action.error.code;

      state.newest.loading = 'failed';
    });
  },
});

export const { loadImportant, loadExperts, loadNewest } = mainSlice.actions;

export default mainSlice.reducer;

export const fetchImportantPosts = (): AppThunkType => async (dispatch) => {
  try {
    const posts = await getPosts('important');
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
        direction: post.mainDirection.name as DirectionEnum,
        title: post.title,
        postType: post.type.name as PostTypeEnum,
      };
    });
    dispatch(loadImportant(loadedPosts));
  } catch (e) {
    console.log(e);
  }
};

export const fetchExperts = (): AppThunkType => async (dispatch) => {
  try {
    const experts = await Promise.resolve(MOCK_EXPERTS);
    dispatch(loadExperts(experts));
  } catch (e) {
    console.log(e);
  }
};
