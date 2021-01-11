/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import _ from 'lodash';
import {
  IExpert,
  IFilter,
  IPost,
  LoadingStatusEnum,
  FilterTypeEnum,
} from '../../../lib/types';
import { getPosts } from '../../../lib/utilities/API/api';
import type { AppThunkType } from '../../../store/store';
import { LOAD_POSTS_LIMIT } from '../../main/components/constants/newestPostsPagination-config';
import { IPostPayload } from '../../main/store/mainSlice';
import type { RootStateType } from '../../../store/rootReducer';
import type { ICheckboxes } from '../../../lib/components/FilterForm';

interface IPostsListPayload extends IPostPayload {}

interface IMaterialsState extends Record<string, IMaterialsPayload> {
  [key: string]: IMaterialsPayload;
}

interface IMaterialsPayload {
  loadedPosts: IPost[];
  meta: IMaterialsMeta;
}

interface IMaterialsMeta {
  loading: LoadingStatusEnum;
  error: null | string;
}

const materialsInitialState: IMaterialsPayload = {
  loadedPosts: [],
  meta: {
    loading: LoadingStatusEnum.idle,
    error: null,
  },
};

export interface IPostsState {
  posts: IPostsListPayload;
  materials: IMaterialsState;
}

const initialState: IPostsState = {
  posts: {
    posts: [],
    meta: {
      loading: LoadingStatusEnum.idle,
      error: null,
    },
  },
  materials: {} as IMaterialsState,
};

export const fetchPostById = createAsyncThunk(
  'posts/loadPostProfile',
  async (id: number, { getState }) => {
    const {
      posts: {
        posts: { posts },
      },
    } = getState() as RootStateType;
    const existingPost = posts.find((post) => post.id === id);
    if (existingPost) {
      return existingPost;
    }

    const { data: fetchedPost } = await fetchPostById(id);
    return fetchedPost;
  },
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    loadPosts: (state, action: PayloadAction<IPostsListPayload>) => {
      state.posts = action.payload;
    },
    setupExpertMaterialsID: (state, action: PayloadAction<string>) => {
      if (!state.materials[action.payload])
        state.materials[action.payload] = materialsInitialState;
    },
    loadMaterials: (
      state,
      action: PayloadAction<{ postId: number; materials: IMaterialsPayload }>,
    ) => {
      const {
        postId,
        materials: { loadedPosts, meta },
      } = action.payload;
      state.materials[postId].loadedPosts = loadedPosts;
      state.materials[postId].meta = meta;
    },
    setMaterialsLoadingStatus: (
      state,
      action: PayloadAction<{
        postId: number;
        status: LoadingStatusEnum;
        error?: string;
      }>,
    ) => {
      const { postId, status, error } = action.payload;
      switch (status) {
        case LoadingStatusEnum.pending:
          state.materials[postId].meta.loading = LoadingStatusEnum.pending;
          break;
        case LoadingStatusEnum.failed:
          state.materials[postId].meta.loading = LoadingStatusEnum.failed;
          state.materials[postId].meta.error = error || null;
          break;
        default:
          state.materials[postId].meta.loading = LoadingStatusEnum.succeeded;
      }
    },
  },
});

export const {
  loadPosts,
  setupExpertMaterialsID,
  loadMaterials,
  setMaterialsLoadingStatus,
} = postsSlice.actions;

export const postsReducer = postsSlice.reducer;
