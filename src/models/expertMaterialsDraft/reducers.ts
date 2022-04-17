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
    title: '',
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
      const typeId = state?.data?.posts?.find(
        (post) => post.id === +action.payload,
      )?.type?.id;
      if (typeId) {
        const filteredPosts = state.data.posts?.filter(
          (post) => post.type.id === typeId,
        );
        if (filteredPosts.length === 1) {
          state.data.filters.filterConfig = state.data.filters.filterConfig?.map(
            ({ id, name, checked }) => ({
              id,
              name,
              checked:
                state.data.meta.isLastPage && typeId === +id ? null : checked,
            }),
          );
        }
      }
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
