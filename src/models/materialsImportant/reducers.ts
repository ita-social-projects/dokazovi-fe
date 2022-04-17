/* eslint-disable */
import { createSlice } from '@reduxjs/toolkit';
import { LoadingStatusEnum } from '../../old/lib/types';
import { IMaterialsState } from '../materials/types';
import { fetchMaterialsImportant } from './asyncActions';
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
    title: '',
  },
  loading: LoadingStatusEnum.idle,
  error: null,
};

export const materialsImportantSlice = createSlice({
  name: 'materialsImportant',
  initialState,
  reducers: {
    resetMaterialsImportant: (state) => {
      state.data = initialState.data;
      state.loading = initialState.loading;
      state.error = initialState.error;
    },
  },
  extraReducers: {
    ...getAsyncActionsReducer(fetchMaterialsImportant as any),
  },
});

export const { resetMaterialsImportant } = materialsImportantSlice.actions;

export const materialsImportantReducer = materialsImportantSlice.reducer;
