/* eslint-disable */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { IFetchExpertsMaterialsDraftOptions } from './types';
import { getPosts } from '../../old/lib/utilities/API/api';
import { mapFetchedPosts } from '../materials/asyncActions';
import { LOAD_POSTS_BY_STATUS_LIMIT } from '../../old/lib/constants/posts';

export const fetchExpertMaterialsDraft = createAsyncThunk(
  'experts/fetchExpertMaterialsDraft',
  async (
    options: IFetchExpertsMaterialsDraftOptions,
    { getState, rejectWithValue },
  ) => {
    try {
      const {
        expertId,
        filters,
        materialsDraft,
        status,
        page,
        appendPosts,
      } = options;
      const response = await getPosts('latest-by-expert-and-status', {
        params: {
          size: LOAD_POSTS_BY_STATUS_LIMIT,
          page: page,
          expert: expertId,
          type: [],
          status: status,
        },
      });

      const {
        expertMaterialsDraft: { data },
      } = getState() as any;
      const { mappedPosts, ids } = mapFetchedPosts(response.data.content);

      const posts = { ...data.posts };
      mappedPosts.forEach((post) => {
        if (posts && post.id) {
          posts[post.id] = post;
        }
      });

      return {
        postIds: appendPosts ? data.postIds.concat(ids) : ids,
        posts,
        filters,
        materialsDraft,
        status,
        meta: {
          isLastPage: response.data.last,
          pageNumber: response.data.number,
          totalElements: response.data.totalElements,
          totalPages: response.data.totalPages,
        },
      };
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  },
);
