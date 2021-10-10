/* eslint-disable */
import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  getUniquePostViewsCounter,
  getPosts,
} from '../../old/lib/utilities/API/api';
import { mapFetchedPosts } from '../materials/asyncActions';
import { IAdminPost, IPostsOBJ, IFechedAdminMatirealOptions } from './types';
import { RootStateType } from '../rootReducer';
const NEW_LOAD_POSTS_LIMIT = 15;

export const getMatirealsAction = createAsyncThunk(
  'adminlab/getAllAdminsMatirealsAction',
  async (_, { rejectWithValue, getState }) => {
    try {
      const {
        adminlab: {
          meta: { sort, filters },
        },
      } = getState() as RootStateType;
      const {
        data: { content },
      } = await getPosts('all-posts', {
        params: {
          page: 0,
          size: NEW_LOAD_POSTS_LIMIT,
          types: filters.types,
          directions: filters.directions,
          origins: filters.origins,
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

      return {
        posts,
        postIds,
      };
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  },
);
