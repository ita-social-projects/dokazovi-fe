/* eslint-disable */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { IFetchExpertsOptions, IFetchExpertsMaterialsOptions } from './types';
import {
  getAllExperts,
  getExpertById,
  getPosts,
} from '../../lib/utilities/API/api';
import type { RootStateType } from '../rootReducer';
import { LOAD_EXPERTS_LIMIT } from '../../lib/constants/experts';
import type { AppThunkType } from '../store';
import { mapFetchedPosts } from '../materials/asyncActions';
import { loadExperts } from '../dataSlice';
// import {
//   PostResponseType,
//   RequestParamsType,
// } from '../../lib/utilities/API/types';
import { LOAD_POSTS_LIMIT } from '../../lib/constants/posts';
import { IPost, LoadingStatusEnum } from '../../lib/types';

// import { loadPosts } from './reducers';

export const fetchExperts = createAsyncThunk(
  'experts/loadExperts',
  async (options: IFetchExpertsOptions, { dispatch }) => {
    const { page, regions, directions, appendExperts } = options;

    const response = await getAllExperts({
      params: {
        page,
        size: LOAD_EXPERTS_LIMIT,
        regions,
        directions,
      },
    });

    dispatch(loadExperts(response.data.content));
    return {
      expertIds: response.data.content.map((expert) => expert.id),
      pageNumber: response.data.number,
      totalPages: response.data.totalPages,
      totalElements: response.data.totalElements,
      isLastPage: response.data.last,
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

export const fetchExpertMaterials = createAsyncThunk(
  'experts/fetchExpertMaterials',
  async (options: IFetchExpertsMaterialsOptions, { getState }) => {
    const { expertId, filters, page, appendPosts } = options;

    const response = await getPosts('latest-by-expert', {
      params: {
        size: LOAD_POSTS_LIMIT,
        page: page,
        expert: expertId,
        type: filters?.postTypes,
      },
    });

    const {
      materials: { data },
    } = getState() as any;

    const { mappedPosts, ids } = mapFetchedPosts(response.data.content);
    const posts = { ...data.posts };
    mappedPosts.forEach((post) => {
      if (posts && post.id) {
        posts[post.id] = post;
      }
    });

    return {
      expertId,
      materials: {
        data: {
          postIds: appendPosts ? data.postIds.concat(ids) : ids,
          posts,
          meta: {
            loading: LoadingStatusEnum.succeeded,
            error: null,
            isLastPage: response.data.last,
            pageNumber: response.data.number,
            totalElements: response.data.totalElements,
            totalPages: response.data.totalPages,
          },
        },
      },
    };
  },
);

// export const fetchInitialMaterials = createAsyncThunk(
//   'materials/fetchMaterials',
//   async (expertId: IFetchExpertsMaterialsOptions, { dispatch, getState }) => {
//     const { postIds } = getState().experts.posts.data;

//     if (!postIds.length) {
//       dispatch(fetchExpertMaterials(expertId));
//     }
//   },
// );

export const fetchInitialMaterials = (expertId): AppThunkType => (
  dispatch,
  getState,
) => {
  const { postIds } = getState().experts.posts.data;

  if (!postIds.length) {
    dispatch(fetchExpertMaterials(expertId));
  }
};
