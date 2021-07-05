/* eslint-disable */
import { createSlice } from '@reduxjs/toolkit';
import { LoadingStatusEnum } from '../../old/lib/types';
import { IExpertsState } from './types';
import { fetchExperts } from './asyncActions';
import { getAsyncActionsReducer } from '../helpers/asyncActions';

const initialState: IExpertsState = {
  data: {
    expertIds: [],
    experts: {},
    meta: {
      totalPages: 0,
      pageNumber: 0,
      isLastPage: false,
      totalElements: 0,
    },
  },
  loading: LoadingStatusEnum.idle,
  error: null,
};

export const expertsSlice = createSlice({
  name: 'experts',
  initialState,
  reducers: {},
  extraReducers: {
    ...getAsyncActionsReducer(fetchExperts as any),
  },
});

export const expertsReducer = expertsSlice.reducer;
