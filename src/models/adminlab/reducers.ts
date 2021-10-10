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
      directions: [1, 2, 3, 4, 5, 6, 7],
      origins: [1, 2, 3],
      types: [1, 2, 3],
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
      const { filter, option } = action.payload;
      const prewFilter = state.meta.filters[filter];
      if (prewFilter.find((o) => option === o)) {
        state.meta.filters[filter] = prewFilter.filter((opt) => opt !== option);
      } else {
        state.meta.filters[filter].push(option);
      }
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
