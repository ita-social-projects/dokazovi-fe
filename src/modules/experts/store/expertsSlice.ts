/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import _ from 'lodash';
import { DIRECTION_PROPERTIES } from '../../../lib/constants/direction-properties';
import { IExpert, IFilter, IPost, LoadingStatusEnum } from '../../../lib/types';
import { getExpertById, getPosts } from '../../../lib/utilities/API/api';
import type { AppThunkType } from '../../../store/store';
import { LOAD_POSTS_LIMIT } from '../../main/components/constants/newestPostsPagination-config';
import { IExpertPayload } from '../../main/store/mainSlice';

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
  filters: IFilter[];
}

export interface IExpertsState {
  experts: IExpertsListPayload;
  materials: IMaterialsState;
}

const materialsInitialState: IMaterialsPayload = {
  loadedPosts: [],
  meta: {
    loading: LoadingStatusEnum.idle,
    error: null,
    isLastPage: false,
    pageNumber: -1,
  },
  filters: [],
};

const initialState: IExpertsState = {
  experts: {
    experts: [],
    meta: {
      loading: LoadingStatusEnum.idle,
      error: null,
    },
    filters: [],
  },
  materials: {} as IMaterialsState,
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
    setupExpertMaterialsID: (state, action: PayloadAction<string>) => {
      if (!state.materials[action.payload])
        state.materials[action.payload] = materialsInitialState;
    },

    loadExperts: (state, action: PayloadAction<IExpertsListPayload>) => {
      state.experts = action.payload;
    },
    setExpertsFilters: (state, action: PayloadAction<IFilter[]>) => {
      state.experts.filters = action.payload;
    },
    loadMaterials: (
      state,
      action: PayloadAction<{ expertId: number; materials: IMaterialsPayload }>,
    ) => {
      const { expertId } = action.payload;
      state.materials[expertId] = action.payload.materials;
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
  },
});

export const {
  loadExperts,
  setExpertsFilters,
  setupExpertMaterialsID,
  loadMaterials,
  setMaterialsLoadingStatus,
} = expertsSlice.actions;

export const expertsReducer = expertsSlice.reducer;

export const fetchExpertPosts = (expertId: number): AppThunkType => async (
  dispatch,
  getState,
) => {
  const { meta, loadedPosts } = getState().experts.materials[expertId];
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
        mainDirection: DIRECTION_PROPERTIES[post.mainDirection.id.toString()],
        title: post.title,
        postType: { id: post.type.id, name: post.type.name },
        preview,
        id: post.id,
      };
    });

    dispatch(
      loadMaterials({
        expertId,
        materials: {
          loadedPosts:
            resp.data.number === -1
              ? fetchedPosts
              : loadedPosts.concat(fetchedPosts),
          meta: {
            loading: LoadingStatusEnum.succeeded,
            error: null,
            pageNumber: resp.data.number,
            isLastPage: resp.data.last,
          },
          filters: [],
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
    dispatch(fetchExpertPosts(expertId));
  }
};
