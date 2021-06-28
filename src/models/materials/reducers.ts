/* eslint-disable */
import { createSlice } from '@reduxjs/toolkit';
import { LoadingStatusEnum } from '../../old/lib/types';
import { IMaterialsState } from './types';
import { fetchMaterials } from './asyncActions';
import { getAsyncActionsReducer } from '../helpers/asyncActions';

const initialState: IMaterialsState = {
  data: {
    postIds: [],
    posts: {},
    meta: {
      isLastPage: false,
      pageNumber: 0,
      totalElements: 0,
      totalPages: 0,
    },
    filters: {},
  },
  loading: LoadingStatusEnum.idle,
  error: null,
};

export const reducers = createSlice({
  name: 'materials',
  initialState,
  reducers: {},
  extraReducers: {
    ...getAsyncActionsReducer(fetchMaterials as any),
  },
});

export const materialsReducer = reducers.reducer;
