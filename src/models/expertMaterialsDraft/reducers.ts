/* eslint-disable */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoadingStatusEnum } from '../../old/lib/types';
import { IMaterialsStateByStatus } from '../expertMaterialsPublished/types';
import { fetchExpertMaterialsDraft } from './asyncActions';
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
  name: 'expertsMaterialsDraft',
  initialState,
  reducers: {
    removePostDraft: (state, action: PayloadAction<number>) => {
      state.data.posts = state.data.posts?.filter(
        (post) => post.id !== action.payload,
      );
    },
    setPageDraft: (state, action: PayloadAction<number>) => {
      state.data.filters.page = action.payload;
    },
  },
  extraReducers: {
    ...getAsyncActionsReducer(fetchExpertMaterialsDraft as any),
  },
});

export const { removePostDraft, setPageDraft } = expertsSlice.actions;

export const expertMaterialsReducerDraft = expertsSlice.reducer;
