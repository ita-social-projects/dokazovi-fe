/* eslint-disable */
import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  getUniquePostViewsCounter,
  getAdminPosts,
} from '../../old/lib/utilities/API/api';
import { mapFetchedPosts } from '../materials/asyncActions';
import { IAdminPost, IPostsOBJ, IFechedAdminMatirealOptions } from './types';
import { RootStateType } from '../rootReducer';
const NEW_LOAD_POSTS_LIMIT = 12;

export const getMatirealsAction = createAsyncThunk(
  'adminlab/getAllAdminsMatirealsAction',
  async (_, { rejectWithValue, getState }) => {
    try {
      const {
        adminlab: {
          meta: { sort, filters, page },
        },
        properties: { directions, postTypes, origins },
      } = getState() as RootStateType;
      const {
        data: { content, totalPages },
      } = await getAdminPosts('all-posts', {
        params: {
          page,
          size: NEW_LOAD_POSTS_LIMIT,
          types: filters.types?.length
            ? filters.types
            : postTypes.map(({ id }) => id),
          directions: filters.directions?.length
            ? filters.directions
            : directions.map(({ id }) => id),
          origins: filters.origins?.length
            ? filters.origins
            : origins.map(({ id }) => id),
          statuses: [],
          sort: [sort.sortBy + ',' + sort.order],
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
      const To = totalPages as number;
      return {
        totalPages: To,
        posts,
        postIds,
      };
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  },
);
