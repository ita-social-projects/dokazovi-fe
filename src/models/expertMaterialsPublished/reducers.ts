/* eslint-disable */
import { createSlice } from '@reduxjs/toolkit';
import { LoadingStatusEnum } from '../../old/lib/types';
import { IMaterialsStatePublished } from '../materials/types';
import { fetchExpertMaterialsPublished } from './asyncActions';
import { getAsyncActionsReducer } from '../helpers/asyncActions';

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
    getAllMaterialsPublished: (state) => {
      const allMaterials = Object.values(state.data.posts);
      state.data.materialsPublished = [...allMaterials].filter((el) => {
        if (state.data.postIds.find((elem) => elem === el.id)) {
          return true;
        }
        return false;
      });
    },
  },
  extraReducers: {
    ...getAsyncActionsReducer(fetchExpertMaterialsPublished as any),
  },
});

export const {
  resetMaterialsPublished,
  getAllMaterialsPublished,
} = expertsSlice.actions;

export const expertMaterialsReducerPublished = expertsSlice.reducer;
