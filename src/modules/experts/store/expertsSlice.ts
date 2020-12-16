/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { ICheckboxes } from '../../../lib/components/FilterForm';
import {
  FilterTypeEnum,
  IFilter,
  IPost,
  LoadingStatusEnum,
} from '../../../lib/types';
import { getAllExperts } from '../../../lib/utilities/API/api';
import type { RootStateType } from '../../../store/rootReducer';
import { IExpertPayload } from '../../main/store/mainSlice';

interface IExpertsListPayload extends IExpertPayload {
  filters?: {
    [FilterTypeEnum.DIRECTIONS]: IFilter;
    [FilterTypeEnum.REGIONS]: IFilter;
  };
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
    filters: {
      [FilterTypeEnum.DIRECTIONS]: {
        value: [],
      },
      [FilterTypeEnum.REGIONS]: {
        value: [],
      },
    },
  },
  materials: [],
};

export const fetchExperts = createAsyncThunk(
  'experts/loadExperts',
  async (__, { getState }) => {
    const {
      experts: { experts },
    } = getState() as RootStateType;
    const filterValues = experts.filters?.REGIONS?.value as ICheckboxes;
    const { data } = await getAllExperts({
      params: {
        page: experts.meta?.pageNumber,
        regions: Object.keys(filterValues).filter((key) => filterValues[key]),
        size: 22,
      },
    });

    return data;
  },
);

export const expertsSlice = createSlice({
  name: 'experts',
  initialState,
  reducers: {
    loadExperts: (state, action: PayloadAction<IExpertPayload>) => {
      state.experts = action.payload;
    },
    setExpertsRegionsFilter: (state, action: PayloadAction<IFilter>) => {
      if (state.experts.filters) {
        state.experts.filters.REGIONS = action.payload;
      }
    },
    setExpertsDirectionsFilter: (state, action: PayloadAction<IFilter>) => {
      const value = action.payload;
      if (state.experts.filters) {
        state.experts.filters.DIRECTIONS = {
          ...state.experts.filters.DIRECTIONS,
          value,
        };
      }
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
  setExpertsRegionsFilter,
  setExpertsDirectionsFilter,
} = expertsSlice.actions;

export const expertsReducer = expertsSlice.reducer;
