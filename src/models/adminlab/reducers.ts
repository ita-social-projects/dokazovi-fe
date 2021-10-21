/* eslint-disable */
import {
  createSlice,
  PayloadAction,
  ActionReducerMapBuilder,
} from '@reduxjs/toolkit';
import { getAsyncActionsReducer } from '../helpers/asyncActions';

import { IAdminlab, IAdminPost, SortBy, Order, ISort, IFilter } from './types';
import { LoadingStatusEnum } from '../../old/lib/types';
import { getMatirealsAction } from './asyncActions';
// так можга тягнути перегляди getUniquePostViewsCounter

const initialState: IAdminlab = {
  data: {
    totalPages: 0,
    postIds: [],
    posts: {},
  },
  meta: {
    sort: {
      order: Order.desc,
      sortBy: SortBy.post_id,
    },
    filters: {
      directions: [],
      origins: [],
      types: [],
    },
    page: 0,
  },
  error: '',
  loading: LoadingStatusEnum.idle,
};

const adminlabSlice = createSlice({
  name: 'adminlab',
  initialState,
  reducers: {
    setStateToInit: (state) => {
      state.data = initialState.data;
      state.meta = initialState.meta;
    },
    setFiltersToInit: (state) => {
      state.meta.filters = initialState.meta.filters;
    },
    setSort: (state, action: PayloadAction<ISort>) => {
      state.meta.sort = action.payload;
    },
    setFilter: (state, action: PayloadAction<IFilter>) => {
      const { filter, options } = action.payload;
      state.meta.filters[filter] = options;
    },
    setPage: (state, action: PayloadAction<{ page: number }>) => {
      state.meta.page = action.payload.page;
    },
    editPost: (state, action: PayloadAction<IAdminPost>) => {
      const editedPostID = action.payload.id;
      state.data.posts = {
        ...state.data.posts,
        [editedPostID]: action.payload,
      };
    },
  },
  extraReducers: {
    ...getAsyncActionsReducer(getMatirealsAction as any),
  },
});

export const {
  setStateToInit,
  editPost,
  setSort,
  setFilter,
  setPage,
  setFiltersToInit,
} = adminlabSlice.actions;
export const adminlabReducer = adminlabSlice.reducer;
