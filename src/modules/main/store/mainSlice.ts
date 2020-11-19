/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import MOCK_POSTS from '../../../lib/constants/mock-data';
import MOCK_EXPERTS from '../mockDataExperts';
import MOCK_NEWEST from '../components/constants/newestPosts-mock';
import { IPost, IExpert } from '../../../lib/types';
import { AppThunk } from '../../../store/store';
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
  // a string that is used as the prefix for generated action types
  // e.g. "main/loadImportant"
  name: 'main',
  initialState,
  // An object of "case reducers" (functions intended to handle a specific
  // action type). Key names will be used to generate actions, equivalent to a
  // single case statement in a switch.
  reducers: {
    // thunks should call these reducers, passing them action payload.
    // they have to be defined separate from the reducer logic.
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

export const fetchImportantPosts = (): AppThunk => async (dispatch) => {
  try {
    const posts = await Promise.resolve(MOCK_POSTS);
    dispatch(loadImportant(posts));
  } catch (e) {
    console.log(e);
  }
};

export const fetchExperts = (): AppThunk => async (dispatch) => {
  try {
    const experts = await Promise.resolve(MOCK_EXPERTS);
    dispatch(loadExperts(experts));
  } catch (e) {
    console.log(e);
  }
};

export const fetchNewestPosts = (): AppThunk => (dispatch, getState) => {
  const { meta } = getState().main.newest;

  const totalNewestPosts =  meta.totalNewestPosts || MOCK_NEWEST.length;
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
