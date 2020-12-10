import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPost, LoadingStatusEnum } from '../../../lib/types';
import { IExpertPayload } from '../../main/store/mainSlice';

export interface IExpertsState {
  experts: IExpertPayload;
  materials: [];
}

interface IMaterialsPayload {
  posts: IPost[];
  // meta:
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
    setExpertsRegion: (state, action: PayloadAction<number | number[]>) => {
      state.experts.meta.regionFilter = action.payload;
    },
    setExpertsDirection: (state, action: PayloadAction<number | number[]>) => {
      state.experts.meta.directionFilter = action.payload;
    },
  },
});

export const {
  loadExperts,
  setExpertsRegion,
  setExpertsDirection,
} = expertsSlice.actions;

export const expertsReducer = expertsSlice.reducer;
