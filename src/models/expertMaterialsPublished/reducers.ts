/* eslint-disable */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPost, LoadingStatusEnum, PostTypeEnum } from '../../old/lib/types';
import { IMaterialsStatePublished, FilterConfigType } from '../materials/types';
import { fetchExpertMaterialsPublished } from './asyncActions';
import { getAsyncActionsReducer } from '../helpers/asyncActions';
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

const initialState: IMaterialsStatePublished = {
  data: {
    postIds: [],
    posts: {},
    materialsPublished: [],
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
    resetMaterialsPublished: (state) => {
      state.data = initialState.data;
      state.loading = initialState.loading;
      state.error = initialState.error;
    },
    getAllMaterialsPublished: (
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
        state.data.materialsPublished = allMaterials.filter(
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
        state.data.materialsPublished = allMaterials.filter(
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
        state.data.materialsPublished = allMaterials.filter(
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
        state.data.materialsPublished = allMaterials.filter(
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
      state.data.materialsPublished = filteredMaterials.filter(
        (_, idx) =>
          idx + 1 <= (state.data.filters.page + 1) * LOAD_POSTS_BY_STATUS_LIMIT,
      );
    },
    setPagePublished: (state, action: PayloadAction<number>) => {
      state.data.filters.page = action.payload;
    },
  },
  extraReducers: {
    ...getAsyncActionsReducer(fetchExpertMaterialsPublished as any),
  },
});

export const {
  resetMaterialsPublished,
  getAllMaterialsPublished,
  setPagePublished,
} = expertsSlice.actions;

export const expertMaterialsReducerPublished = expertsSlice.reducer;
