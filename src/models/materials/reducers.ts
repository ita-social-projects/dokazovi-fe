/* eslint-disable */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
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
    title: '',
  },

  loading: LoadingStatusEnum.idle,
  error: null,
};

export const materialsSlice = createSlice({
  name: 'materials',
  initialState,
  reducers: {
    searchTitle: (state, action: PayloadAction<{ title: string }>) => {
      const { title } = action.payload;
      state.data.title = title;
      console.log(state.data.title);
    },
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

export const { searchTitle, resetMaterials } = materialsSlice.actions;

export const materialsReducer = materialsSlice.reducer;
