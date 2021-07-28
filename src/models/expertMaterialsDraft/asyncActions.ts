/* eslint-disable */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { IFetchExpertsMaterialsByStatusOptions } from '../expertMaterialsPublished/types';
import { getPostsByStatus } from '../../old/lib/utilities/API/api';
import { mapFetchedPosts } from '../materials/asyncActions';
import { LOAD_POSTS_BY_STATUS_LIMIT } from '../../old/lib/constants/posts';

export const fetchExpertMaterialsDraft = createAsyncThunk(
  'experts/fetchExpertMaterialsDraft',
  async (
    options: IFetchExpertsMaterialsByStatusOptions,
    { getState, rejectWithValue },
  ) => {
    try {
      const { expertId, filters, status, appendPosts } = options;

      let types;
      if (
        filters.filterConfig.filter(({ checked }) => (checked ? true : false))
          .length === 0
      ) {
        types = undefined;
      } else {
        types = filters.filterConfig
          .filter(({ checked }) => (checked ? true : false))
          .map(({ id }) => +id)
          .join(',');
      }

      const response = await getPostsByStatus('latest-by-expert-and-status', {
        size: LOAD_POSTS_BY_STATUS_LIMIT,
        page: filters.page,
        expert: expertId,
        types,
        status: status,
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
        posts: appendPosts ? [...data.posts, ...mappedPosts] : mappedPosts,
        filters: {
          ...filters,
        },
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
