/* eslint-disable */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getAsyncActionsReducer } from '../helpers/asyncActions';

import {
  IAdminLab,
  IAdminPost,
  SortBy,
  Order,
  ISort,
  IFilter,
  IField,
  IDateManipulation
} from './types';
import { LoadingStatusEnum } from '../../old/lib/types';
import { getMaterialsAction, archiveAdminPost } from './asyncActions';
import { access } from 'fs';

// так можга тягнути перегляди getUniquePostViewsCounter

const initialState: IAdminLab = {
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
      types: [],
      statuses: [],
    },
    page: 0,
    textFields: {
      author: '',
      title: '',
    },
    date: {
      start: undefined,
      end: undefined,
    },
  },
  error: '',
  loading: LoadingStatusEnum.idle,
};

const adminLabSlice = createSlice({
  name: 'adminLab',
  initialState,
  reducers: {
    setStateToInit: (state) => {
      state.data = initialState.data;
      state.meta = initialState.meta;
    },
    setSize: (state, action: PayloadAction<{ size: number }>) => {
      state.meta.size = action.payload.size;
      state.meta.page = initialState.meta.page;
    },
    setField: (state, action: PayloadAction<IField>) => {
      const { text, field } = action.payload;
      state.meta.textFields[field] = text;
      state.meta.page = initialState.meta.page;
    },
    setFiltersToInit: (state) => {
      state.meta.filters = initialState.meta.filters;
      state.meta.textFields = initialState.meta.textFields;
      state.meta.page = initialState.meta.page;
    },
    setSort: (state, action: PayloadAction<ISort>) => {
      state.meta.sort = action.payload;
      state.meta.page = initialState.meta.page;
    },
    setFilter: (state, action: PayloadAction<IFilter>) => {
      const { filter, options } = action.payload;
      state.meta.filters[filter] = options;
      state.meta.page = initialState.meta.page;
    },
    setPage: (state, action: PayloadAction<{ page: number }>) => {
      state.meta.page = action.payload.page;
    },
    setDate: (state, action: PayloadAction<IDateManipulation>)=>{
      const { date, option } = action.payload;
      state.meta.date[option] = date;
      state.meta.page = initialState.meta.page;
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
    ...getAsyncActionsReducer(archiveAdminPost as any),
    [archiveAdminPost.fulfilled.type]: (
      state,
      action: PayloadAction<string>,
    ) => {
      state.data.posts[action.payload] = {
        ...state.data.posts[action.payload],
        status: 'ARCHIVED',
      };
    },
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
  setDate,
} = adminLabSlice.actions;
export const adminLabReducer = adminLabSlice.reducer;
