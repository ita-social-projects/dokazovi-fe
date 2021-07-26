/* eslint-disable */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { IFetchExpertsMaterialsPublishedOptions } from './types';
import { getPosts } from '../../old/lib/utilities/API/api';
import { mapFetchedPosts } from '../materials/asyncActions';
import { LOAD_POSTS_BY_STATUS_LIMIT } from '../../old/lib/constants/posts';

export const fetchExpertMaterialsPublished = createAsyncThunk(
  'experts/fetchExpertMaterialsPublished',
  async (
    options: IFetchExpertsMaterialsPublishedOptions,
    { getState, rejectWithValue },
  ) => {
    try {
      const {
        expertId,
        filters,
        materialsPublished,
        status,
        page,
        appendPosts,
      } = options;

      const response = await getPosts('latest-by-expert-and-status', {
        params: {
          size: LOAD_POSTS_BY_STATUS_LIMIT,
          page,
          expert: expertId,
          types: filters.filterConfig.map(({ id }) => +id) ?? [],
          status: status,
        },
      });

      const {
        expertMaterialsPublished: { data },
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
        materialsPublished,
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
