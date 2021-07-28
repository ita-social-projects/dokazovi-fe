/* eslint-disable */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoadingStatusEnum } from '../../old/lib/types';
import { IMaterialsStateByStatus } from './types';
import { fetchExpertMaterialsPublished } from './asyncActions';
import { getAsyncActionsReducer } from '../helpers/asyncActions';
import { allCheckedFilterConfig } from '../utilities/filterConfigTypes';

const initialState: IMaterialsStateByStatus = {
  data: {
    postIds: [],
    posts: [],
    meta: {
      isLastPage: false,
      pageNumber: 0,
      totalElements: 0,
      totalPages: 0,
    },
    filters: {
      page: 0,
      isAllFiltersChecked: true,
      filterConfig: allCheckedFilterConfig,
    },
    status,
  },
  loading: LoadingStatusEnum.idle,
  error: null,
};

export const expertsSlice = createSlice({
  name: 'expertsMaterialsPublished',
  initialState,
  reducers: {
    setPagePublished: (state, action: PayloadAction<number>) => {
      state.data.filters.page = action.payload;
    },
  },
  extraReducers: {
    ...getAsyncActionsReducer(fetchExpertMaterialsPublished as any),
  },
});

export const { setPagePublished } = expertsSlice.actions;

export const expertMaterialsReducerPublished = expertsSlice.reducer;
