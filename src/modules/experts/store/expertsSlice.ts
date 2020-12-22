/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import _ from 'lodash';
import {
  IExpert,
  IFilter,
  IPost,
  LoadingStatusEnum,
  FilterTypeEnum,
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

const POST_PREVIEW_LENGTH = 150;

interface IExpertsListPayload extends IExpertPayload {
  filters: IFilter[];
}

interface IMaterialsState extends Record<string, IMaterialsPayload> {
  [key: string]: IMaterialsPayload;
}

interface IMaterialsMeta {
  loading: LoadingStatusEnum;
  error: null | string;
  isLastPage: boolean;
  pageNumber: number;
}

interface IMaterialsPayload {
  loadedPosts: IPost[];
  meta: IMaterialsMeta;
  filters?: {
    [FilterTypeEnum.POST_TYPES]?: IFilter;
  };
}

const materialsInitialState: IMaterialsPayload = {
  loadedPosts: [],
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
    experts: [],
    meta: {
      totalPages: undefined,
      pageNumber: 1,
      loading: LoadingStatusEnum.idle,
      error: null,
    },
    filters: [],
  },
  materials: {} as IMaterialsState,
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
    setupExpertMaterialsID: (state, action: PayloadAction<string>) => {
      if (!state.materials[action.payload])
        state.materials[action.payload] = materialsInitialState;
    },

    loadExperts: (state, action: PayloadAction<IExpertsListPayload>) => {
      state.experts = action.payload;
    },
    setExpertsPage: (state, action: PayloadAction<number>) => {
      state.experts.meta.pageNumber = action.payload;
    },
    setExpertsFilters: (state, action: PayloadAction<IFilter[]>) => {
      state.experts.filters = action.payload;
    },
    loadMaterials: (
      state,
      action: PayloadAction<{ expertId: number; materials: IMaterialsPayload }>,
    ) => {
      const { expertId, materials: { loadedPosts, meta } } = action.payload;
      state.materials[expertId].loadedPosts = loadedPosts;
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
    setMaterialsTypes: (
      state,
      action: PayloadAction<{
        types: IFilter;
        expertId: string;
      }>,
    ) => {
      const { types, expertId } = action.payload;
      const materials = state.materials[expertId];
      materials.filters = {
        [FilterTypeEnum.POST_TYPES]: types,
      };
      materials.meta.pageNumber = -1;
      materials.loadedPosts = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchExperts.pending, (state) => {
      state.experts.meta.loading = LoadingStatusEnum.pending;
    });
    builder.addCase(fetchExperts.fulfilled, (state, { payload }) => {
      state.experts.meta.loading = LoadingStatusEnum.succeeded;
      state.experts.meta.pageNumber = payload.number;
      state.experts.meta.totalPages = payload.totalPages - 1;
      state.experts.experts = payload.content;
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
    builder.addCase(fetchExpertById.fulfilled, (state, { payload }) => {
      state.experts.experts.push(payload);
      state.experts.meta.loading = LoadingStatusEnum.succeeded;
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
  loadExperts,
  setExpertsFilters,
  setupExpertMaterialsID,
  loadMaterials,
  setMaterialsLoadingStatus,
  setExpertsPage,
  setMaterialsTypes,
} = expertsSlice.actions;

export const expertsReducer = expertsSlice.reducer;

export const fetchExpertMaterials = (expertId: number): AppThunkType => async (
  dispatch,
  getState,
) => {
  const { meta, loadedPosts, filters } = getState().experts.materials[expertId];
  const postTypes = filters?.[FilterTypeEnum.POST_TYPES]?.value as string[];

  try {
    dispatch(
      setMaterialsLoadingStatus({
        expertId,
        status: LoadingStatusEnum.pending,
      }),
    );

    const resp = await getPosts('latest-by-expert', {
      params: {
        size: LOAD_POSTS_LIMIT,
        page: meta.pageNumber + 1,
        expert: expertId,
        type: postTypes,
      },
    });

    const fetchedPosts: IPost[] = resp.data.content.map((post) => {
      const postAuthor = {
        ..._.pick(post.author, [
          'avatar',
          'firstName',
          'lastName',
          'mainInstitution',
        ]),
      } as IExpert;

      const preview = _.truncate(post.content, {
        length: POST_PREVIEW_LENGTH,
      });

      return {
        author: postAuthor,
        createdAt: post.createdAt,
        directions: post.directions,
        title: post.title,
        postType: post.type,
        preview,
        id: post.id,
      };
    });

    dispatch(
      loadMaterials({
        expertId,
        materials: {
          loadedPosts: loadedPosts.concat(fetchedPosts),
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
  const { loadedPosts } = getState().experts.materials[expertId];

  if (!loadedPosts.length) {
    dispatch(fetchExpertMaterials(expertId));
  }
};
