/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IFilter, IPost, LoadingStatusEnum } from '../../../lib/types';
import { getAllExperts } from '../../../lib/utilities/API/api';
import { IExpertPayload } from '../../main/store/mainSlice';
import type { RootStateType } from '../../../store/rootReducer';

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
      totalPages: 0,
      pageNumber: 1,
      loading: LoadingStatusEnum.idle,
      error: null,
    },
    filters: [],
  },
  materials: [],
};

export const fetchExperts = createAsyncThunk(
  'experts/loadExperts',
  async (__, { getState }) => {
    const {
      experts: { experts },
    } = getState() as RootStateType;
    const { data } = await getAllExperts({
      params: {
        page: experts.meta.pageNumber,
      },
    });

    return data;
  },
);

export const expertsSlice = createSlice({
  name: 'experts',
  initialState,
  reducers: {
    loadExperts: (state, action: PayloadAction<IExpertsListPayload>) => {
      state.experts = action.payload;
    },
    setExpertsPage: (state, action: PayloadAction<number>) => {
      state.experts.meta.pageNumber = action.payload;
    },
    setExpertsFilters: (state, action: PayloadAction<IFilter[]>) => {
      state.experts.filters = action.payload;
    },

    loadMaterials: (state, action: PayloadAction<IMaterialsPayload>) => {
      state.materials.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchExperts.pending, (state) => {
      state.experts.meta.loading = LoadingStatusEnum.pending;
    });
    builder.addCase(fetchExperts.fulfilled, (state, { payload }) => {
      state.experts.meta.loading = LoadingStatusEnum.succeeded;
      state.experts.meta.pageNumber = payload.number;
      state.experts.meta.totalPages = payload.totalPages;
      state.experts.experts = payload.content;
    });
    builder.addCase(fetchExperts.rejected, (state, { error }) => {
      if (error.message) {
        state.experts.meta.error = error.message;
      }

      state.experts.meta.loading = LoadingStatusEnum.failed;
    });
  },
});

export const {
  loadExperts,
  setExpertsFilters,
  setExpertsPage,
} = expertsSlice.actions;

export const expertsReducer = expertsSlice.reducer;
