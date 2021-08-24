/* eslint-disable */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { IFetchExpertsMaterialsOptions } from './types';
import { getPosts } from '../../old/lib/utilities/API/api';
import { mapFetchedPosts } from '../materials/asyncActions';
import { LOAD_POSTS_LIMIT } from '../../old/lib/constants/posts';

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

      const {
        expertMaterials: { data },
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
        posts: [...data.posts,...response.data.content],
        meta: {
          isLastPage: response.data.last,
          pageNumber: response.data.number,
          totalElements: response.data.totalElements,
          totalPages: response.data.totalPages,
        },
        filters,
      };
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  },
);
