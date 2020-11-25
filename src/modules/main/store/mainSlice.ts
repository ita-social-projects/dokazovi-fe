/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Axios from 'axios';
import MOCK_POSTS from '../../../lib/constants/mock-data';
import MOCK_EXPERTS from '../mockDataExperts';
import MOCK_NEWEST from '../components/constants/newestPosts-mock';
import { IPost, IExpert } from '../../../lib/types';
import type { AppThunkType } from '../../../store/store';
import { LOAD_POSTS_LIMIT } from '../components/constants/newestPostsPagination-config';

interface IMeta {
  totalNewestPosts?: number;
  limit?: number;
  currentIndex: number;
  showMore?: boolean;
}

interface INewestPostPayload {
  newestPosts: IPost[];
  meta: IMeta;
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
      currentIndex: 0,
    },
  },
  important: [],
  experts: [],
};

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
});

export const { loadImportant, loadExperts, loadNewest } = mainSlice.actions;

export default mainSlice.reducer;

export const fetchImportantPosts = (): AppThunkType => async (dispatch) => {
  try {
    const posts = await Axios.get(
      'https://abe717b5de32.ngrok.io/api/post/important',
    );
    console.log(posts.data);
    dispatch(loadImportant(posts.data));
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

export const fetchNewestPosts = (): AppThunkType => (dispatch, getState) => {
  const { meta } = getState().main.newest;

  const totalNewestPosts = meta.totalNewestPosts || MOCK_NEWEST.length;
  const newIndex = meta.currentIndex + LOAD_POSTS_LIMIT;
  const newShowMore = newIndex < totalNewestPosts - 1;
  const newList = MOCK_NEWEST.slice(0, newIndex);

  dispatch(
    loadNewest({
      newestPosts: newList,
      meta: {
        totalNewestPosts,
        currentIndex: newIndex,
        showMore: newShowMore,
      },
    }),
  );
};
