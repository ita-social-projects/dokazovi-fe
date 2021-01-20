/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  IDirection,
  IExpert,
  IFilter,
  FilterTypeEnum,
  LoadingStatusEnum,
} from '../../../lib/types';
import { getPosts, getExperts } from '../../../lib/utilities/API/api';
import { loadPosts, mapFetchedPosts } from '../../../store/dataSlice';
import type { AppThunkType } from '../../../store/store';

import { LOAD_POSTS_LIMIT } from '../../main/components/constants/newestPostsPagination-config';

export interface IDirectionsState extends Record<string, IDirectionState> {
  [key: string]: IDirectionState;
}

export interface IExpertsMeta {
  loading: LoadingStatusEnum;
  error: null | string;
}

interface IMaterialsState {
  postIds: string[];
  meta: IMaterialsMeta;
  filters?: {
    [key in FilterTypeEnum]?: IFilter;
  };
}

export interface IMaterialsMeta {
  isLastPage: boolean;
  pageNumber: number;
  loading: LoadingStatusEnum;
  error: null | string;
}

export interface IDirectionState {
  experts: {
    expertsCards: IExpert[];
    meta: IExpertsMeta;
  };
  materials: IMaterialsState;
}

const initialDirectionState: IDirectionState = {
  experts: {
    expertsCards: [],
    meta: {
      loading: LoadingStatusEnum.idle,
      error: null,
    },
  },
  materials: {
    postIds: [],
    meta: {
      isLastPage: false,
      pageNumber: -1,
      loading: LoadingStatusEnum.idle,
      error: null,
    },
    filters: {},
  },
};

export const directionsSlice = createSlice({
  name: 'direction',
  initialState: {} as IDirectionsState,
  reducers: {
    setupDirection: (state, action: PayloadAction<string>) => {
      if (!state[action.payload]) {
        state[action.payload] = initialDirectionState;
      }
    },
    setExpertsLoadingStatus: (
      state,
      action: PayloadAction<{
        directionName: string;
        status: LoadingStatusEnum;
        error?: string;
      }>,
    ) => {
      const { directionName, status, error } = action.payload;

      switch (status) {
        case LoadingStatusEnum.pending:
          state[directionName].experts.meta.loading = LoadingStatusEnum.pending;
          break;
        case LoadingStatusEnum.failed:
          state[directionName].experts.meta.loading = LoadingStatusEnum.failed;
          state[directionName].experts.meta.error = error || null;
          break;
        default:
          state[directionName].experts.meta.loading =
            LoadingStatusEnum.succeeded;
          break;
      }
    },
    loadExperts: (
      state,
      action: PayloadAction<{
        experts: IExpert[];
        meta: IExpertsMeta;
        directionName: string;
      }>,
    ) => {
      const { directionName } = action.payload;
      const direction = state[directionName] as IDirectionState;
      if (direction) {
        direction.experts.expertsCards = action.payload.experts;
        direction.experts.meta = action.payload.meta;
      }
    },
    setMaterialsLoadingStatus: (
      state,
      action: PayloadAction<{
        direction: IDirection;
        status: LoadingStatusEnum;
        error?: string;
      }>,
    ) => {
      const { direction, status, error } = action.payload;

      switch (status) {
        case LoadingStatusEnum.pending:
          state[direction.name].materials.meta.loading =
            LoadingStatusEnum.pending;
          break;
        case LoadingStatusEnum.failed:
          state[direction.name].materials.meta.loading =
            LoadingStatusEnum.failed;
          state[direction.name].materials.meta.error = error || null;
          break;
        default:
          state[direction.name].materials.meta.loading =
            LoadingStatusEnum.succeeded;
      }
    },
    loadMaterials: (
      state,
      action: PayloadAction<{
        materials: IMaterialsState;
        directionName: string;
      }>,
    ) => {
      const { directionName, materials } = action.payload;
      const direction = state[directionName];
      if (direction) {
        direction.materials.postIds = materials.postIds;
        direction.materials.meta = materials.meta;
      }
    },
    setPostFilters: (
      state,
      action: PayloadAction<{
        key: FilterTypeEnum;
        filters: IFilter;
        directionName: string;
      }>,
    ) => {
      const { key, filters, directionName } = action.payload;
      const direction = state[directionName] as IDirectionState;
      if (direction) {
        direction.materials.filters = {
          ...direction.materials.filters,
          [key]: filters,
        };
        direction.materials.meta.pageNumber = -1;
        direction.materials.postIds.length = 0;
      }
    },
  },
});

export const {
  setMaterialsLoadingStatus,
  loadMaterials,
  setExpertsLoadingStatus,
  loadExperts,
  setupDirection,
  setPostFilters,
} = directionsSlice.actions;

export const directionsReducer = directionsSlice.reducer;

export const fetchExperts = (
  directionName: string,
  directionId: string,
): AppThunkType => async (dispatch) => {
  dispatch(
    setExpertsLoadingStatus({
      directionName,
      status: LoadingStatusEnum.pending,
    }),
  );

  try {
    const loadedExperts = await getExperts({
      params: {
        directions: [directionId],
        size: 11,
      },
    });

    const experts = loadedExperts.data.content.map((expert) => ({
      ...(expert as IExpert),
    }));

    dispatch(
      loadExperts({
        experts,
        meta: {
          loading: LoadingStatusEnum.succeeded,
          error: null,
        },
        directionName,
      }),
    );
  } catch (e) {
    dispatch(
      setExpertsLoadingStatus({
        directionName,
        status: LoadingStatusEnum.failed,
        error: String(e),
      }),
    );
  }
};

export const fetchMaterials = (direction: IDirection): AppThunkType => async (
  dispatch,
  getState,
) => {
  const { meta, filters } = getState().directions[direction.name].materials;
  const postTypes = filters?.[FilterTypeEnum.POST_TYPES]?.value as string[];
  const postTags = filters?.[FilterTypeEnum.TAGS]?.value as string[];

  try {
    dispatch(
      setMaterialsLoadingStatus({
        direction,
        status: LoadingStatusEnum.pending,
      }),
    );

    const response = await getPosts('latest-by-direction', {
      params: {
        direction: direction.id,
        page: meta.pageNumber + 1,
        size: LOAD_POSTS_LIMIT,
        type: postTypes,
        tag: postTags,
      },
    });

    const { mappedPosts, ids } = mapFetchedPosts(response.data.content);

    dispatch(loadPosts(mappedPosts));

    dispatch(
      loadMaterials({
        directionName: direction.name,
        materials: {
          postIds: ids,
          meta: {
            isLastPage: response.data.last,
            loading: LoadingStatusEnum.succeeded,
            pageNumber: response.data.number,
            error: null,
          },
        },
      }),
    );
  } catch (e) {
    dispatch(
      setMaterialsLoadingStatus({
        direction,
        status: LoadingStatusEnum.failed,
        error: String(e),
      }),
    );
  }
};

export const fetchInitialMaterials = (direction: IDirection): AppThunkType => (
  dispatch,
  getState,
) => {
  const { postIds } = getState().directions[direction.name].materials;

  if (postIds.length === 0) {
    dispatch(fetchMaterials(direction));
  }
};
