/* eslint-disable */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoadingStatusEnum } from '../../old/lib/types';
import {
  IExpertsState,
  AutorsListOrder,
  AutorsListSortBy,
  ISortAutorsList,
  ITextFields,
} from './types';
import { fetchExperts, fetchExpertsAutorsList } from './asyncActions';
import { getAsyncActionsReducer } from '../helpers/asyncActions';

const initialState: IExpertsState = {
  data: {
    expertIds: [],
    experts: {},
    totalPages: 0,
    isLastPage: true,
    totalElements: 0,
  },
  meta: {
    pageNumber: 0,
    size: 25,
    textFields: {
      author: '',
    },
    sort: {
      order: AutorsListOrder.desc,
      sortBy: AutorsListSortBy.editedAt,
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
      state.meta.pageNumber = initialState.meta.pageNumber;
    },
    setPageNumber: (state, action: PayloadAction<number>) => {
      state.meta.pageNumber = action.payload;
    },
    setField: (state, action: PayloadAction<ITextFields>) => {
      const { text, field } = action.payload;
      state.meta.textFields[field] = text;
      state.meta.pageNumber = 0;
    },
    setSort: (state, action: PayloadAction<ISortAutorsList>) => {
      state.meta.sort = action.payload;
      state.meta.pageNumber = initialState.meta.pageNumber;
    },
  },
  extraReducers: {
    ...getAsyncActionsReducer(fetchExperts as any),
    ...getAsyncActionsReducer(fetchExpertsAutorsList as any),
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
