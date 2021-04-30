/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoadingStatusEnum } from '../../lib/types';
import {
  getAllExperts,
  getExpertById,
  getPosts,
} from '../../lib/utilities/API/api';
import type { AppThunkType } from '../store';
import type { RootStateType } from '../rootReducer';
import { loadExperts, loadPosts, mapFetchedPosts } from '../dataSlice';
import { RequestParamsType } from '../../lib/utilities/API/types';
import { LOAD_EXPERTS_LIMIT } from '../../lib/constants/experts';
import { LOAD_POSTS_LIMIT } from '../../lib/constants/posts';
import { IExpertsState, IFetchExpertsOptions } from './types';
import { IMaterialsState } from '../materials/types';

const initialMaterialsState: IMaterialsState = {
  postIds: [],
  meta: {
    isLastPage: false,
    loading: LoadingStatusEnum.idle,
    error: null,
    pageNumber: 0,
    totalElements: 0,
    totalPages: 0,
  },
};

const initialState: IExpertsState = {
  experts: {
    expertIds: [],
    meta: {
      totalPages: 0,
      pageNumber: 0,
      loading: LoadingStatusEnum.idle,
      error: null,
      isLastPage: false,
      totalElements: 0,
    },
  },
  materials: initialMaterialsState,
};

export const fetchExperts = createAsyncThunk(
  'experts/loadExperts',
  async (options: IFetchExpertsOptions, { dispatch }) => {
    const { page, regions, directions, appendExperts } = options;

    const { data } = await getAllExperts({
      params: {
        page,
        size: LOAD_EXPERTS_LIMIT,
        regions,
        directions,
      },
    });
    dispatch(loadExperts(data.content));
    return {
      expertIds: data.content.map((expert) => expert.id),
      pageNumber: data.number,
      totalPages: data.totalPages,
      totalElements: data.totalElements,
      isLastPage: data.last,
      appendExperts,
    };
  },
);

export const fetchExpertById = createAsyncThunk(
  'experts/loadExpertProfile',
  async (id: number, { dispatch, getState }) => {
    const {
      data: { experts },
    } = getState() as RootStateType;
    const existingExpert = experts[id];

    if (existingExpert) {
      return existingExpert.id;
    }

    const { data: fetchedExpert } = await getExpertById(id);
    dispatch(loadExperts([fetchedExpert]));

    return fetchedExpert.id;
  },
);

export const expertsSlice = createSlice({
  name: 'experts',
  initialState,
  reducers: {
    resetMaterials: (state) => {
      state.materials = initialMaterialsState;
    },
    loadMaterials: (
      state,
      action: PayloadAction<{ expertId: number; materials: IMaterialsState }>,
    ) => {
      const {
        materials: { postIds, meta },
      } = action.payload;
      state.materials.postIds = postIds;
      state.materials.meta = meta;
    },
    setMaterialsLoadingStatus: (
      state,
      action: PayloadAction<{
        expertId: number;
        status: LoadingStatusEnum;
        error?: string;
      }>,
    ) => {
      const { status, error } = action.payload;
      switch (status) {
        case LoadingStatusEnum.pending:
          state.materials.meta.loading = LoadingStatusEnum.pending;
          break;
        case LoadingStatusEnum.failed:
          state.materials.meta.loading = LoadingStatusEnum.failed;
          state.materials.meta.error = error || null;
          break;
        default:
          state.materials.meta.loading = LoadingStatusEnum.succeeded;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchExperts.pending, (state) => {
      state.experts.meta.loading = LoadingStatusEnum.pending;
    });
    builder.addCase(fetchExperts.fulfilled, (state, { payload }) => {
      state.experts.meta.loading = LoadingStatusEnum.succeeded;
      state.experts.meta.pageNumber = payload.pageNumber;
      state.experts.meta.totalPages = payload.totalPages;
      state.experts.meta.totalElements = payload.totalElements;
      state.experts.meta.isLastPage = payload.isLastPage;
      state.experts.expertIds = payload.appendExperts
        ? state.experts.expertIds.concat(payload.expertIds)
        : payload.expertIds;
    });
    builder.addCase(fetchExperts.rejected, (state, { error }) => {
      if (error.message) {
        state.experts.meta.error = error.message;
      }

      state.experts.meta.loading = LoadingStatusEnum.failed;
    });
    builder.addCase(fetchExpertById.pending, (state) => {
      state.experts.meta.loading = LoadingStatusEnum.pending;
    });
    builder.addCase(fetchExpertById.fulfilled, (state) => {
      state.experts.meta.loading = LoadingStatusEnum.succeeded; // TODO add slice for single expert
    });
    builder.addCase(fetchExpertById.rejected, (state, { error }) => {
      if (error.message) {
        state.experts.meta.error = error.message;
      }
      state.experts.meta.loading = LoadingStatusEnum.failed;
    });
  },
});

export const {
  resetMaterials,
  loadMaterials,
  setMaterialsLoadingStatus,
} = expertsSlice.actions;

export const expertsReducer = expertsSlice.reducer;

export const fetchExpertMaterials = (
  expertId: number,
  filters?: RequestParamsType,
  appendPosts = false,
): AppThunkType => async (dispatch, getState) => {
  const { postIds } = getState().experts.materials;

  try {
    dispatch(
      setMaterialsLoadingStatus({
        expertId,
        status: LoadingStatusEnum.pending,
      }),
    );

    const params: RequestParamsType = {
      size: LOAD_POSTS_LIMIT,
      page: appendPosts ? (filters?.page as number) : 0,
      expert: expertId,
      type: filters?.type,
    };

    const resp = await getPosts('latest-by-expert', { params });

    const { mappedPosts, ids } = mapFetchedPosts(resp.data.content);

    dispatch(loadPosts(mappedPosts));

    dispatch(
      loadMaterials({
        expertId,
        materials: {
          postIds: appendPosts ? postIds.concat(ids) : ids,
          meta: {
            loading: LoadingStatusEnum.succeeded,
            error: null,
            isLastPage: resp.data.last,
            pageNumber: resp.data.number,
            totalElements: resp.data.totalElements,
            totalPages: resp.data.totalPages,
          },
        },
      }),
    );
  } catch (e) {
    dispatch(
      setMaterialsLoadingStatus({
        expertId,
        status: LoadingStatusEnum.failed,
        error: String(e),
      }),
    );
  }
};

export const fetchInitialMaterials = (expertId: number): AppThunkType => (
  dispatch,
  getState,
) => {
  const { postIds } = getState().experts.materials;

  if (!postIds.length) {
    dispatch(fetchExpertMaterials(expertId));
  }
};
