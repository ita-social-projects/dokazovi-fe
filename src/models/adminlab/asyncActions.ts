/* eslint-disable */
import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  getUniquePostViewsCounter,
  getAdminPosts,
} from '../../old/lib/utilities/API/api';
import { mapFetchedPosts } from '../materials/asyncActions';
import { IAdminPost, IPostsOBJ } from './types';
import { RootStateType } from '../rootReducer';
import { values } from 'lodash';

interface IFilterOption {
  id: number;
}

const setFilter = (
  selected: number[] | undefined,
  all: IFilterOption[],
): number[] => {
  return selected?.length ? selected : all.map(({ id }) => id);
};

export const getMaterialsAction = createAsyncThunk(
  'adminlab/getAllAdminsMatirealsAction',
  async (_, { rejectWithValue, getState }) => {
    try {
      const {
        adminlab: {
          meta: { sort, filters, page, size, textFields },
        },
        properties: { directions, postTypes, origins, statuses },
      } = getState() as RootStateType;
      const {
        data: { content, totalPages },
      } = await getAdminPosts('all-posts', {
        params: {
          page,
          size,
          types: setFilter(filters.types, postTypes),
          directions: setFilter(filters.directions, directions),
          origins: setFilter(filters.origins, origins),
          statuses: setFilter(filters.statuses, statuses),
          sort: [sort.sortBy + ',' + sort.order],
          ...textFields,
        },
      });
      const { ids: postIds } = mapFetchedPosts(content);
      const postWithViews: IAdminPost[] = await Promise.all(
        content.map(async (post) => {
          const { data } = await getUniquePostViewsCounter(post.id);
          return {
            ...post,
            uniqueViewsCounter: data,
            modifiedViewsCounter: 4 + data,
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
