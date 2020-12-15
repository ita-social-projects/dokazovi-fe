/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IFilter, IPost, LoadingStatusEnum } from '../../../lib/types';
import { IExpertPayload } from '../../main/store/mainSlice';

interface IExpertsListPayload extends IExpertPayload {
  filters: IFilter[];
}

interface IMaterialsMeta {
  loading: LoadingStatusEnum;
  error: null | string;
}

interface IMaterialsPayload {
  id: number;
  loadedPosts: IPost[];
  meta: IMaterialsMeta;
  filters: IFilter[];
}

export interface IExpertsState {
  experts: IExpertsListPayload;
  materials: IMaterialsPayload[];
}

const initialState: IExpertsState = {
  experts: {
    experts: [],
    meta: {
      loading: LoadingStatusEnum.idle,
      error: null,
    },
    filters: {
      enum: {
        value: [],
      },
    },
  },
  materials: [],
};

export const expertsSlice = createSlice({
  name: 'experts',
  initialState,
  reducers: {
    loadExperts: (state, action: PayloadAction<IExpertsListPayload>) => {
      state.experts = action.payload;
    },
    setExpertsFilters: (state, action: PayloadAction<IFilter[]>) => {
      state.experts.filters = action.payload;
    },

    loadMaterials: (state, action: PayloadAction<IMaterialsPayload>) => {
      state.materials.push(action.payload);
    },
  },
});

export const { loadExperts, setExpertsFilters } = expertsSlice.actions;

export const expertsReducer = expertsSlice.reducer;
