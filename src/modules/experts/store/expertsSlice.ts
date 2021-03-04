/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  IFilter,
  LoadingStatusEnum,
  FilterTypeEnum,
  ICheckboxes,
  UrlFilterTypes,
} from '../../../lib/types';
import {
  getAllExperts,
  getExpertById,
  getPosts,
} from '../../../lib/utilities/API/api';
import type { AppThunkType } from '../../../store/store';
import { LOAD_POSTS_LIMIT } from '../../main/components/constants/newestPostsPagination-config';
import { IExpertPayload } from '../../main/store/mainSlice';
import type { RootStateType } from '../../../store/rootReducer';
import {
  loadExperts,
  loadPosts,
  mapFetchedPosts,
} from '../../../store/dataSlice';
import { RequestParamsType } from '../../../lib/utilities/API/types';

interface IExpertsListPayload extends IExpertPayload {
  filters?: {
    [FilterTypeEnum.DIRECTIONS]: IFilter;
    [FilterTypeEnum.REGIONS]: IFilter;
  };
}

interface IMaterialsState extends Record<string, IMaterialsPayload> {}

interface IMaterialsMeta {
  loading: LoadingStatusEnum;
  error: null | string;
  isLastPage: boolean;
  pageNumber: number;
}

interface IMaterialsPayload {
  postIds: string[];
  meta: IMaterialsMeta;
  filters?: {
    [FilterTypeEnum.POST_TYPES]?: IFilter;
  };
}

interface IMaterialsFilters extends Record<UrlFilterTypes, unknown> {}

const materialsInitialState: IMaterialsPayload = {
  postIds: [],
  meta: {
    loading: LoadingStatusEnum.idle,
    error: null,
    isLastPage: false,
    pageNumber: -1,
  },
  filters: {},
};

export interface IExpertsState {
  experts: IExpertsListPayload;
  materials: IMaterialsState;
}

const initialState: IExpertsState = {
  experts: {
    expertIds: [],
    meta: {
      totalPages: undefined,
      pageNumber: 0,
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
  materials: {} as IMaterialsState,
};

export const fetchExperts = createAsyncThunk(
  'experts/loadExperts',
  async (__, { dispatch, getState }) => {
    const {
      experts: { experts },
    } = getState() as RootStateType;

    const regionsFilterValues = experts.filters?.REGIONS?.value as ICheckboxes;
    const directionsFilterValues = experts.filters?.DIRECTIONS
      ?.value as ICheckboxes;

    const getTrueValues = (filterValues: ICheckboxes) => {
      return Object.keys(filterValues).filter((key) => filterValues[key]);
    };

    const { data } = await getAllExperts({
      params: {
        page: experts.meta?.pageNumber,
        regions: getTrueValues(regionsFilterValues),
        directions: getTrueValues(directionsFilterValues),
      },
    });
    dispatch(loadExperts(data.content));

    return {
      expertIds: data.content.map((expert) => String(expert.id)),
      number: data.number,
      totalPages: data.totalPages,
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
    setupExpertMaterialsID: (state, action: PayloadAction<string>) => {
      if (!state.materials[action.payload])
        state.materials[action.payload] = materialsInitialState;
    },
    setExpertsPage: (state, action: PayloadAction<number>) => {
      state.experts.meta.pageNumber = action.payload;
    },
    setExpertsRegionsFilter: (state, action: PayloadAction<IFilter>) => {
      if (state.experts.filters) {
        state.experts.filters.REGIONS = action.payload;
      }
    },
    setExpertsDirectionsFilter: (state, action: PayloadAction<IFilter>) => {
      if (state.experts.filters) {
        state.experts.filters.DIRECTIONS = action.payload;
      }
    },
    loadMaterials: (
      state,
      action: PayloadAction<{ expertId: number; materials: IMaterialsPayload }>,
    ) => {
      const {
        expertId,
        materials: { postIds, meta },
      } = action.payload;
      state.materials[expertId].postIds = postIds;
      state.materials[expertId].meta = meta;
    },
    setMaterialsLoadingStatus: (
      state,
      action: PayloadAction<{
        expertId: number;
        status: LoadingStatusEnum;
        error?: string;
      }>,
    ) => {
      const { expertId, status, error } = action.payload;
      switch (status) {
        case LoadingStatusEnum.pending:
          state.materials[expertId].meta.loading = LoadingStatusEnum.pending;
          break;
        case LoadingStatusEnum.failed:
          state.materials[expertId].meta.loading = LoadingStatusEnum.failed;
          state.materials[expertId].meta.error = error || null;
          break;
        default:
          state.materials[expertId].meta.loading = LoadingStatusEnum.succeeded;
      }
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
      state.experts.expertIds = payload.expertIds;
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
  setExpertsRegionsFilter,
  setExpertsDirectionsFilter,
  setupExpertMaterialsID,
  loadMaterials,
  setMaterialsLoadingStatus,
  setExpertsPage,
} = expertsSlice.actions;

export const expertsReducer = expertsSlice.reducer;

export const fetchExpertMaterials = (
  expertId: number,
  filters?: IMaterialsFilters,
  loadMore?: boolean,
): AppThunkType => async (dispatch, getState) => {
  const { postIds } = getState().experts.materials[expertId];

  try {
    dispatch(
      setMaterialsLoadingStatus({
        expertId,
        status: LoadingStatusEnum.pending,
      }),
    );

    const params: RequestParamsType = {
      size: LOAD_POSTS_LIMIT,
      page: loadMore ? (filters?.page as number) : 0,
      expert: expertId,
    };

    if (filters?.types) {
      params.type = filters?.types as string[];
    }

    const resp = await getPosts('latest-by-expert', { params });

    const { mappedPosts, ids } = mapFetchedPosts(resp.data.content);

    dispatch(loadPosts(mappedPosts));

    dispatch(
      loadMaterials({
        expertId,
        materials: {
          postIds: loadMore ? postIds.concat(ids) : ids,
          meta: {
            loading: LoadingStatusEnum.succeeded,
            error: null,
            pageNumber: resp.data.number,
            isLastPage: resp.data.last,
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
  const { postIds } = getState().experts.materials[expertId];

  if (!postIds.length) {
    dispatch(fetchExpertMaterials(expertId));
  }
};
