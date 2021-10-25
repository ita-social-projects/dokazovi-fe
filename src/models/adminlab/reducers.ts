/* eslint-disable */
import {
  createSlice,
  PayloadAction,
  ActionReducerMapBuilder,
} from '@reduxjs/toolkit';
import { getAsyncActionsReducer } from '../helpers/asyncActions';

import {
  IAdminlab,
  IAdminPost,
  SortBy,
  Order,
  ISort,
  IFilter,
  IField,
} from './types';
import { LoadingStatusEnum } from '../../old/lib/types';
import { getMaterialsAction } from './asyncActions';

const initialState: IAdminlab = {
  data: {
    totalPages: 0,
    postIds: [],
    posts: {},
  },
  meta: {
    size: 12,
    sort: {
      order: Order.desc,
      sortBy: SortBy.post_id,
    },
    filters: {
      directions: [],
      origins: [],
      types: [],
      statuses: [],
    },
    page: 0,
    textFields: {
      author: '',
      title: '',
    },
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
    setSize: (state, action: PayloadAction<{ size: number }>) => {
      state.meta.size = action.payload.size;
    },
    setField: (state, action: PayloadAction<IField>) => {
      const { text, field } = action.payload;
      state.meta.textFields[field] = text;
    },
    setFiltersToInit: (state) => {
      state.meta.filters = initialState.meta.filters;
      state.meta.textFields = initialState.meta.textFields;
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
    ...getAsyncActionsReducer(getMaterialsAction as any),
  },
});

export const {
  setStateToInit,
  editPost,
  setSort,
  setFilter,
  setPage,
  setFiltersToInit,
  setField,
} = adminlabSlice.actions;
export const adminlabReducer = adminlabSlice.reducer;