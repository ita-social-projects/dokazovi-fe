/* eslint-disable */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { IFetchExpertsMaterialsOptions, IFetchExpertsOptions } from './types';
import { getAllExperts, getPosts } from '../../old/lib/utilities/API/api';
import { LOAD_EXPERTS_LIMIT } from '../../old/lib/constants/experts';
import { mapFetchedPosts } from '../materials/asyncActions';
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
  async (options: IFetchExpertsOptions, { getState, rejectWithValue }) => {
    try {
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

      const appendIds = [
        ...new Set(appendExperts ? data.expertIds.concat(ids) : ids),
      ];

      return {
        expertIds: appendIds,
        experts,
        meta: {
          pageNumber: response.data.number,
          totalPages: response.data.totalPages,
          totalElements: response.data.totalElements,
          isLastPage: response.data.last,
          appendExperts,
        },
      };
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  },
);

export const fetchExpertMaterials = createAsyncThunk(
  'experts/fetchExpertMaterials',
  async (
    options: IFetchExpertsMaterialsOptions,
    { getState, rejectWithValue },
  ) => {
    try {
      const { expertId, filters, page, appendPosts } = options;
      const response = await getPosts('latest-by-expert', {
        params: {
          size: LOAD_POSTS_LIMIT,
          page: page,
          expert: expertId,
          type: filters?.type,
          direction: filters?.directions,
        },
      });

      const { experts } = getState() as any;
      const { mappedPosts, ids } = mapFetchedPosts(response.data.content);

      const posts = { ...experts.posts.data.posts };
      mappedPosts.forEach((post) => {
        if (posts && post.id) {
          posts[post.id] = post;
        }
      });

      return {
        data: {
          postIds: appendPosts ? experts.posts.data.postIds.concat(ids) : ids,
          posts,
          meta: {
            isLastPage: response.data.last,
            pageNumber: response.data.number,
            totalElements: response.data.totalElements,
            totalPages: response.data.totalPages,
          },
          loading: LoadingStatusEnum.succeeded,
          error: null,
          filters,
        },
      };
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  },
);
