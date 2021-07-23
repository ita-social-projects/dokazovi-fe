/* eslint-disable */
import { createSlice } from '@reduxjs/toolkit';
import { LoadingStatusEnum } from '../../old/lib/types';
import { IMaterialsStateByStatus } from '../materials/types';
import { fetchExpertMaterialsPublished } from './asyncActions';
import { getAsyncActionsReducer } from '../helpers/asyncActions';

const initialState: IMaterialsStateByStatus = {
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
    status,
  },
  loading: LoadingStatusEnum.idle,
  error: null,
};

export const expertsSlice = createSlice({
  name: 'expertsMaterialsPublished',
  initialState,
  reducers: {
    resetMaterialsPublished: (state) => {
      state.data = initialState.data;
      state.loading = initialState.loading;
      state.error = initialState.error;
    },
  },
  extraReducers: {
    ...getAsyncActionsReducer(fetchExpertMaterialsPublished as any),
  },
});

export const { resetMaterialsPublished } = expertsSlice.actions;

export const expertMaterialsReducerPublished = expertsSlice.reducer;
