/* eslint-disable */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoadingStatusEnum } from '../../old/lib/types';
import {
  IExpertsState,
  AutorsListOrder,
  AuthorsListSortBy,
  ISortAutorsList,
  ITextFields,
} from './types';
import {
  deleteAuthor,
  fetchExperts,
  fetchExpertsAutorsList,
} from './asyncActions';
import { getAsyncActionsReducer } from '../helpers/asyncActions';

const initialState: IExpertsState = {
  data: {
    expertIds: [],
    experts: {},
    totalPages: 0,
    isLastPage: true,
    totalElements: 0,
    pageNumber: 0,
  },
  meta: {
    size: 25,
    textFields: {
      author: '',
    },
    sort: {
      order: AutorsListOrder.desc,
      sortBy: AuthorsListSortBy.editedAt,
    },
  },
  loading: LoadingStatusEnum.idle,
  error: null,
};

export const expertsSlice = createSlice({
  name: 'experts',
  initialState,
  reducers: {
    setExpertsStateToInit: (state) => {
      state.data = initialState.data;
      state.meta = {
        ...initialState.meta,
        textFields: { ...initialState.meta.textFields },
        sort: { ...initialState.meta.sort },
      };
    },
    setSize: (state, action: PayloadAction<number>) => {
      state.meta.size = action.payload;
      state.data.pageNumber = initialState.data.pageNumber;
    },
    setPageNumber: (state, action: PayloadAction<number>) => {
      state.data.pageNumber = action.payload;
    },
    setField: (state, action: PayloadAction<ITextFields>) => {
      const { text, field } = action.payload;
      state.meta.textFields[field] = text;
      state.data.pageNumber = 0;
    },
    setSort: (state, action: PayloadAction<ISortAutorsList>) => {
      state.meta.sort = action.payload;
      state.data.pageNumber = initialState.data.pageNumber;
    },
  },
  extraReducers: {
    ...getAsyncActionsReducer(fetchExperts as any),
    ...getAsyncActionsReducer(fetchExpertsAutorsList as any),
    ...getAsyncActionsReducer(deleteAuthor as any),
  },
});

export const {
  setSize,
  setPageNumber,
  setField,
  setSort,
  setExpertsStateToInit,
} = expertsSlice.actions;

export const expertsReducer = expertsSlice.reducer;
