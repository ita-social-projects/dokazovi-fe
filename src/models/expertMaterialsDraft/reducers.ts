/* eslint-disable */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoadingStatusEnum } from '../../old/lib/types';
import { IMaterialsStateDraft } from '../materials/types';
import { fetchExpertMaterialsDraft } from './asyncActions';
import { getAsyncActionsReducer } from '../helpers/asyncActions';

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
    filters: {},
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
    getAllMaterialsDraft: (state) => {
      const allMaterials = Object.values(state.data.posts);
      state.data.materialsDraft = [...allMaterials].filter((el) => {
        if (state.data.postIds.find((elem) => elem === el.id)) {
          return true;
        }
        return false;
      });
    },
    removePostDraft: (state, action: PayloadAction<number>) => {
      state.data.materialsDraft = state.data.materialsDraft?.filter(
        (post) => post.id !== action.payload,
      );
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
} = expertsSlice.actions;

export const expertMaterialsReducerDraft = expertsSlice.reducer;
