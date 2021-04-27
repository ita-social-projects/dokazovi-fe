/* eslint-disable */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getPosts } from '../../lib/utilities/API/api';
import { LOAD_POSTS_LIMIT } from '../../lib/constants/posts';

export const fetchMaterials = createAsyncThunk(
  'materials/fetchMaterials',
  async (args: any) => {
    const response = await getPosts('latest', {
      params: {
        page: args.page,
        size: LOAD_POSTS_LIMIT,
        type: args.filters.postTypes,
        directions: args.filters.directions,
      },
    });

    return {
      data: response.data,
      appendPosts: args.appendPosts,
    };
  },
);
