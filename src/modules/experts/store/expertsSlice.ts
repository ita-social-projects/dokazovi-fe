/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IFilter, IPost, LoadingStatusEnum } from '../../../lib/types';
import { getExpertById } from '../../../lib/utilities/API/api';
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
    filters: [],
  },
  materials: [],
};

export const fetchExpertById = createAsyncThunk(
  'experts/loadExpertProfile',
  async (id: number) => {
    const { data: expert } = await getExpertById(id);
    return expert;
  },
);

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
  extraReducers: (builder) => {
    builder
      .addCase(fetchExpertById.pending, (state) => {
        state.experts.meta.loading = LoadingStatusEnum.pending;
      })
      .addCase(fetchExpertById.fulfilled, (state, { payload }) => {
        state.experts.experts.push(payload);
        state.experts.meta.loading = LoadingStatusEnum.succeeded;
      })
      .addCase(fetchExpertById.rejected, (state, { error }) => {
        if (error.message) {
          state.experts.meta.error = error.message;
        }
        state.experts.meta.loading = LoadingStatusEnum.failed;
      });
  }
});

export const { loadExperts, setExpertsFilters } = expertsSlice.actions;

export const expertsReducer = expertsSlice.reducer;
