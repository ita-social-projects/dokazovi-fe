/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LOAD_POSTS_LIMIT } from '../../../lib/constants/posts';
import { QueryTypeEnum, LoadingStatusEnum } from '../../../lib/types';
import { getPosts } from '../../../lib/utilities/API/api';
import { loadPosts, mapFetchedPosts } from '../../../store/dataSlice';
import type { AppThunkType } from '../../../store/store';
import { IMaterialsMeta } from '../../../store/types';

export interface IMaterialsState {
  postIds: number[];
  meta: IMaterialsMeta;
  filters?: {
    [key in QueryTypeEnum]?: number[];
  };
}

const initialState: IMaterialsState = {
  postIds: [],
  meta: {
    isLastPage: false,
    loading: LoadingStatusEnum.idle,
    error: null,
  },
  filters: {},
};

export const materialsSlice = createSlice({
  name: 'materials',
  initialState,
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
  },
});

export const {
  setMaterialsLoadingStatus,
  loadMaterials,
} = materialsSlice.actions;

export const materialsReducer = materialsSlice.reducer;

export const fetchMaterials = (
  filters: { directions: number[]; postTypes: number[] },
  page: number,
  appendPosts: boolean,
): AppThunkType => async (dispatch, getState) => {
  const { postIds } = getState().materials;

  try {
    dispatch(
      setMaterialsLoadingStatus({
        status: LoadingStatusEnum.pending,
      }),
    );

    // currently fething all the posts, filters are not supported at this endpoint
    const response = await getPosts('latest', {
      params: {
        page,
        size: LOAD_POSTS_LIMIT,
        type: filters.postTypes,
        directions: filters.directions,
      },
    });

    const { mappedPosts, ids } = mapFetchedPosts(response.data.content);

    dispatch(loadPosts(mappedPosts));

    dispatch(
      loadMaterials({
        postIds: appendPosts ? postIds.concat(ids) : ids,
        meta: {
          isLastPage: response.data.last,
          loading: LoadingStatusEnum.succeeded,
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
