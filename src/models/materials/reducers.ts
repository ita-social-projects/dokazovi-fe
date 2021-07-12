/* eslint-disable */
import { createSlice } from '@reduxjs/toolkit';
import { LoadingStatusEnum } from '../../old/lib/types';
import { IMaterialsState } from './types';
import { fetchMaterials } from './asyncActions';
import { getAsyncActionsReducer } from '../helpers/asyncActions';
import { expertsSlice } from '../expertMaterials/reducers';

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

export const materialsSlice = createSlice({
  name: 'materials',
  initialState,
  reducers: {
    resetMaterials: (state) => {
      state.data = initialState.data;
      state.loading = initialState.loading;
      state.error = initialState.error;
    },
  },
  extraReducers: {
    ...getAsyncActionsReducer(fetchMaterials as any),
  },
});

export const { resetMaterials } = materialsSlice.actions;

export const materialsReducer = materialsSlice.reducer;
