/* eslint-disable */
import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  getUniquePostViewsCounter,
  getPosts,
} from '../../old/lib/utilities/API/api';
import { mapFetchedPosts } from '../materials/asyncActions';
import { IAdminPost, IPostsOBJ, IFechedAdminMatirealOptions } from './types';
const NEW_LOAD_POSTS_LIMIT = 15;

export const getMatirealsAction = createAsyncThunk(
  'adminlab/getAllAdminsMatirealsAction',
  async (
    options: IFechedAdminMatirealOptions,
    { rejectWithValue, getState },
  ) => {
    try {
      const { sortBy, order, filters } = options;
      const {
        data: { content },
      } = await getPosts('all-posts', {
        params: {
          page: 0,
          size: NEW_LOAD_POSTS_LIMIT,
          types: [1, 2, 3],
          directions: [1, 1, 3, 4, 7, 6, 2],
          origins: [1, 2, 3],
          sort: [sortBy + ',' + order],
        },
      });
      const { ids: postIds } = mapFetchedPosts(content);
      const postWithViews: IAdminPost[] = await Promise.all(
        content.map(async (post) => {
          const { data } = await getUniquePostViewsCounter(post.id);
          return {
            ...post,
            uniqueViewsCounter: data,
            modifideViewsCounter: 4 + data,
          };
        }),
      );
      const posts: IPostsOBJ = {};
      postWithViews.forEach((post) => {
        if (posts && post.id) {
          posts[post.id] = post;
        }
      });

      return {
        posts,
        postIds,
        sort: {
          sortBy,
          order,
        },
        filters,
      };
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  },
);
