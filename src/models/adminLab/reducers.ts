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
  IDateManipulation,
  StatusesForActions,
} from './types';
import { LoadingStatusEnum } from '../../old/lib/types';
import {
  getMaterialsAction,
  deleteAdminPost,
  setPostStatus,
  setFakeViews,
} from './asyncActions';

const initialState: IAdminLab = {
  data: {
    totalPages: 0,
    postIds: [],
    posts: {},
  },
  modifications: {
    fakeViews: 0,
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
    setDate: (state, action: PayloadAction<IDateManipulation>) => {
      const { date, option } = action.payload;
      state.meta.date[option] = date;
      state.meta.page = initialState.meta.page;
    },
    setFakeViewsInput: (
      state,
      action: PayloadAction<{ fakeViews: number }>,
    ) => {
      const { fakeViews } = action.payload;
      state.modifications.fakeViews = fakeViews;
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
    ...getAsyncActionsReducer(deleteAdminPost as any),
    ...getAsyncActionsReducer(setPostStatus as any),
    ...getAsyncActionsReducer(setFakeViews as any),
    [deleteAdminPost.fulfilled.type]: (
      state,
      action: PayloadAction<string>,
    ) => {
      delete state.data.posts[action.payload];
      if (state.data.postIds.length % state.meta.size == 1) {
        if (state.meta.page + 1 == state.data.totalPages) {
          state.meta.page -= 1;
        }
        state.data.totalPages -= 1;
      }
      state.data.postIds = state.data.postIds.filter(
        (id) => id !== +action.payload,
      );
    },
    [setPostStatus.fulfilled.type]: (
      state,
      action: PayloadAction<{ id: number; status: number }>,
    ) => {
      const { id, status } = action.payload;
      state.data.posts[id] = {
        ...state.data.posts[id],
        status: StatusesForActions[status],
      };
    },
    [setFakeViews.fulfilled.type]: (
      state,
      action: PayloadAction<{ id: number; fakeViews: number }>,
    ) => {
      const { id } = action.payload;
      const postToModify = state.data.posts[id];
      if (postToModify.modifiedViewsCounter) {
        postToModify.modifiedViewsCounter = state.modifications.fakeViews;
      } else {
        postToModify.modifiedViewsCounter = state.modifications.fakeViews;
      }
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
  setFakeViewsInput,
} = adminLabSlice.actions;
export const adminLabReducer = adminLabSlice.reducer;
