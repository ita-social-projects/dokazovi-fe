/* eslint-disable */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { IFetchExpertsMaterialsOptions, IFetchExpertsOptions } from './types';
import {
  getAllExperts,
  getExpertById,
  getPosts,
} from '../../old/lib/utilities/API/api';
import { LOAD_EXPERTS_LIMIT } from '../../old/lib/constants/experts';
import type { AppThunkType } from '../../old/store/store';
import { mapFetchedPosts } from '../materials/asyncActions';
import { loadExperts } from '../../old/store/dataSlice';
import { LOAD_POSTS_LIMIT } from '../../old/lib/constants/posts';
import { IExpert, LoadingStatusEnum } from '../../old/lib/types';
import { ExpertResponseType } from '../../old/lib/utilities/API/types';

export const mapFetchedExperts = (
  experts: ExpertResponseType[],
): { mappedExperts: IExpert[]; ids: number[] } => {
  const ids: number[] = experts.map((expert) => expert.id);

  return { mappedExperts: experts, ids };
};

export const fetchExperts = createAsyncThunk(
  'experts/loadExperts',
  async (options: IFetchExpertsOptions, { getState }) => {
    const { page, regions, directions, appendExperts } = options;

    const response = await getAllExperts({
      params: {
        page,
        size: LOAD_EXPERTS_LIMIT,
        regions,
        directions,
      },
    });

    const {
      experts: { data },
    } = getState() as any;

    const { mappedExperts, ids } = mapFetchedExperts(response.data.content);
    const experts = { ...data.experts };
    mappedExperts.forEach((expert) => {
      if (experts && expert.id) {
        experts[expert.id] = expert;
      }
    });

    return {
      expertIds: appendExperts ? data.expertIds.concat(ids) : ids,
      experts,
      meta: {
        pageNumber: response.data.number,
        totalPages: response.data.totalPages,
        totalElements: response.data.totalElements,
        isLastPage: response.data.last,
        appendExperts,
      },
    };
  },
);

export const fetchExpertById = createAsyncThunk(
  'experts/loadExpertProfile',
  async (id: number, { dispatch, getState }) => {
    const {
      data: { experts },
    } = getState() as any;
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

export const fetchInitialMaterials = (expertId): AppThunkType => (
  dispatch,
  getState,
) => {
  const { postIds } = getState().experts.posts.data;

  if (!postIds.length) {
    dispatch(fetchExpertMaterials(expertId));
  }
}; // it can be implemented as function not thunk;
