/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPost, LoadingStatusEnum } from '../../../lib/types';
import { IExpertPayload } from '../../main/store/mainSlice';

export interface IExpertsState {
  experts: IExpertPayload;
  materials: IMaterialsPayload[];
}

interface IMaterialsMeta {
  loading: LoadingStatusEnum;
  error: null | string;
  typeFilter: null | number | number[];
}

interface IMaterialsPayload {
  id: number;
  loadedPosts: IPost[];
  meta: IMaterialsMeta;
}

const initialState: IExpertsState = {
  experts: {
    experts: [],
    meta: {
      loading: LoadingStatusEnum.idle,
      error: null,
      directionFilter: null,
      regionFilter: null,
    },
  },
  materials: [],
};

export const expertsSlice = createSlice({
  name: 'experts',
  initialState,
  reducers: {
    loadExperts: (state, action: PayloadAction<IExpertPayload>) => {
      state.experts = action.payload;
    },
    setExpertsRegionFilter: (
      state,
      action: PayloadAction<number | number[]>,
    ) => {
      state.experts.meta.regionFilter = action.payload;
    },
    setExpertsDirectionFilter: (
      state,
      action: PayloadAction<number | number[]>,
    ) => {
      state.experts.meta.directionFilter = action.payload;
    },
    loadMaterials: (state, action: PayloadAction<IMaterialsPayload>) => {
      state.materials.push(action.payload);
    },
  },
});

export const {
  loadExperts,
  setExpertsRegionFilter,
  setExpertsDirectionFilter,
} = expertsSlice.actions;

export const expertsReducer = expertsSlice.reducer;
