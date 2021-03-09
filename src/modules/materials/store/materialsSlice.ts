/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  IDirection,
  IFilter,
  FilterTypeEnum,
  LoadingStatusEnum,
} from '../../../lib/types';
import { getPosts } from '../../../lib/utilities/API/api';
import { loadPosts, mapFetchedPosts } from '../../../store/dataSlice';
import type { AppThunkType } from '../../../store/store';

import { LOAD_POSTS_LIMIT } from '../../main/components/constants/newestPostsPagination-config';

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
  fetchedPageNumbers?: number[]; // reset on view switch
}

const initialMaterialsState: IMaterialsState = {
  postIds: [],
  meta: {
    isLastPage: false,
    pageNumber: -1,
    loading: LoadingStatusEnum.idle,
    error: null,
  },
  filters: {},
};

export const materialsSlice = createSlice({
  name: 'materials',
  initialState: initialMaterialsState,
  reducers: {
    setMaterialsLoadingStatus: (
      state,
      action: PayloadAction<{
        status: LoadingStatusEnum;
        error?: string;
      }>,
    ) => {
      const { status, error } = action.payload;

      switch (status) {
        case LoadingStatusEnum.pending:
          state.meta.loading = LoadingStatusEnum.pending;
          break;
        case LoadingStatusEnum.failed:
          state.meta.loading = LoadingStatusEnum.failed;
          state.meta.error = error || null;
          break;
        default:
          state.meta.loading = LoadingStatusEnum.succeeded;
      }
    },
    loadMaterials: (state, action: PayloadAction<IMaterialsState>) => {
      const materials = action.payload;

      state.postIds = materials.postIds;
      state.meta = materials.meta;
    },

    // only needed for tags
    setPostFilters: (
      state,
      action: PayloadAction<{
        key: FilterTypeEnum;
        filters: IFilter;
      }>,
    ) => {
      const { key, filters } = action.payload;

      state.filters = {
        ...state.filters,
        [key]: filters,
      };
      // set pageNumber to 0 when changing filters!
      state.meta.pageNumber = -1;
      state.postIds.length = 0;
    },
  },
});

export const {
  setMaterialsLoadingStatus,
  loadMaterials,
  setPostFilters,
} = materialsSlice.actions;

export const materialsReducer = materialsSlice.reducer;

export const fetchMaterials = (
  directions: IDirection[] | null,
  postTypes: string[] = [],
): AppThunkType => async (dispatch, getState) => {
  const {
    postIds,
    filters,
    meta: { pageNumber },
  } = getState().materials;
  const postTags = filters?.[FilterTypeEnum.TAGS]?.value as string[];

  try {
    dispatch(
      setMaterialsLoadingStatus({
        status: LoadingStatusEnum.pending,
      }),
    );

    const response = await getPosts('latest', {
      params: {
        page: pageNumber + 1,
        size: LOAD_POSTS_LIMIT,
        type: postTypes,
        tag: postTags,
      },
    });

    const { mappedPosts, ids } = mapFetchedPosts(response.data.content);

    dispatch(loadPosts(mappedPosts));

    dispatch(
      loadMaterials({
        postIds: postIds.concat(ids),
        meta: {
          isLastPage: response.data.last,
          loading: LoadingStatusEnum.succeeded,
          pageNumber: response.data.number,
          error: null,
        },
      }),
    );
  } catch (e) {
    dispatch(
      setMaterialsLoadingStatus({
        status: LoadingStatusEnum.failed,
        error: String(e),
      }),
    );
  }
};
