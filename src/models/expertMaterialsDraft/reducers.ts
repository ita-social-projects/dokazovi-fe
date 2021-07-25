/* eslint-disable */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPost, LoadingStatusEnum } from '../../old/lib/types';
import { IMaterialsStateDraft, FilterConfigType } from '../materials/types';
import { fetchExpertMaterialsDraft } from './asyncActions';
import { getAsyncActionsReducer } from '../helpers/asyncActions';
import { PostTypeEnum } from '../../old/lib/types';
import { LOAD_POSTS_BY_STATUS_LIMIT } from '../../old/lib/constants/posts';

const allCheckedFilterConfig = [
  { id: '1', name: 'Стаття', checked: true },
  { id: '2', name: 'Відео', checked: true },
  { id: '3', name: 'Допис', checked: true },
] as FilterConfigType[];

const allUncheckedFilterConfig = [
  { id: '1', name: 'Стаття', checked: false },
  { id: '2', name: 'Відео', checked: false },
  { id: '3', name: 'Допис', checked: false },
] as FilterConfigType[];

const allCheckedFiltersExludeNulls = (state: FilterConfigType[]) => {
  return state.map(({ id, name, checked }) => {
    if (checked === null) {
      return { id, name, checked };
    }
    return { id, name, checked: true };
  });
};

const allUnCheckedFiltersExludeNulls = (state: FilterConfigType[]) => {
  return state.map(({ id, name, checked }) => {
    if (checked === null) {
      return { id, name, checked };
    }
    return { id, name, checked: false };
  });
};

const initialState: IMaterialsStateDraft = {
  data: {
    postIds: [],
    posts: {},
    materialsDraft: [],
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
    resetMaterialsDraft: (state) => {
      state.data = initialState.data;
      state.loading = initialState.loading;
      state.error = initialState.error;
    },

    getAllMaterialsDraft: (
      state,
      action: PayloadAction<FilterConfigType | boolean>,
    ) => {
      const allMaterials = [...Object.values(state.data.posts)].filter((el) => {
        if (state.data.postIds.find((elem) => elem === el.id)) {
          return true;
        }
        return false;
      });

      if (typeof action.payload === 'boolean' && action.payload === true) {
        state.data.filters.filterConfig = allCheckedFiltersExludeNulls(
          state.data.filters.filterConfig,
        );
        state.data.materialsDraft = allMaterials.filter(
          (_, idx) =>
            idx + 1 <=
            (state.data.filters.page + 1) * LOAD_POSTS_BY_STATUS_LIMIT,
        );
        state.data.filters.isAllFiltersChecked = true;
        return;
      }
      if (typeof action.payload === 'boolean' && action.payload === false) {
        state.data.filters.filterConfig = allUnCheckedFiltersExludeNulls(
          state.data.filters.filterConfig,
        );
        state.data.materialsDraft = allMaterials.filter(
          (_, idx) =>
            idx + 1 <=
            (state.data.filters.page + 1) * LOAD_POSTS_BY_STATUS_LIMIT,
        );
        state.data.filters.isAllFiltersChecked = false;
        return;
      }

      const newFilter = action.payload;

      const updatedFilters = state.data.filters.filterConfig.map(
        ({ id, name, checked }) => {
          if (id === newFilter.id) {
            return { id, name, checked: newFilter.checked };
          }
          return { id, name, checked };
        },
      );
      state.data.filters.filterConfig = updatedFilters;
      if (
        state.data.filters.filterConfig
          .filter(({ checked }) => checked !== null)
          .every(({ checked }) => checked === true)
      ) {
        state.data.filters.filterConfig = allCheckedFiltersExludeNulls(
          state.data.filters.filterConfig,
        );
        state.data.materialsDraft = allMaterials.filter(
          (_, idx) =>
            idx + 1 <=
            (state.data.filters.page + 1) * LOAD_POSTS_BY_STATUS_LIMIT,
        );
        state.data.filters.isAllFiltersChecked = true;
        return;
      }
      if (
        state.data.filters.filterConfig
          .filter(({ checked }) => checked !== null)
          .every(({ checked }) => checked === false)
      ) {
        state.data.filters.filterConfig = allUnCheckedFiltersExludeNulls(
          state.data.filters.filterConfig,
        );
        state.data.materialsDraft = allMaterials.filter(
          (_, idx) =>
            idx + 1 <=
            (state.data.filters.page + 1) * LOAD_POSTS_BY_STATUS_LIMIT,
        );
        state.data.filters.isAllFiltersChecked = false;
        return;
      }

      const filteredMaterials = allMaterials.filter((material) =>
        updatedFilters.some(({ id, checked }) =>
          material.type.id === +id ? (checked ? true : false) : false,
        ),
      );
      state.data.filters.isAllFiltersChecked = false;
      state.data.materialsDraft = filteredMaterials.filter(
        (_, idx) =>
          idx + 1 <= (state.data.filters.page + 1) * LOAD_POSTS_BY_STATUS_LIMIT,
      );
    },
    removePostDraft: (state, action: PayloadAction<number>) => {
      state.data.materialsDraft = state.data.materialsDraft?.filter(
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

export const {
  resetMaterialsDraft,
  getAllMaterialsDraft,
  removePostDraft,
  setPageDraft,
} = expertsSlice.actions;

export const expertMaterialsReducerDraft = expertsSlice.reducer;
