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
    postIds: [],
    posts: {},
  },
  meta: {
    sort: {
      order: Order.desc,
      sortBy: SortBy.published_at,
    },
    filters: {
      directions: [],
      origins: [],
      types: [],
    },
  },
  error: '',
  loading: LoadingStatusEnum.idle,
};

const adminlabSlice = createSlice({
  name: 'adminlab',
  initialState,
  reducers: {
    setSort: (state, action: PayloadAction<ISort>) => {
      state.meta.sort = action.payload;
    },
    setFilter: (state, action: PayloadAction<IFilter>) => {
      const { filter, options } = action.payload;
      state.meta.filters[filter] = options;
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

export const { editPost, setSort, setFilter } = adminlabSlice.actions;
export const adminlabReducer = adminlabSlice.reducer;
