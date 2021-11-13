/* eslint-disable */
import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  getUniquePostViewsCounter,
  archivePost,
  getPosts,
  updatePost,
} from '../../old/lib/utilities/API/api';
import { mapFetchedPosts } from '../materials/asyncActions';
import { IAdminPost, IAdminLabData } from './types';
import { RootStateType } from '../rootReducer';

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
  'adminLab/getAllAdminsMaterialsAction',
  async (
    _,
    { rejectWithValue, getState },
  ): Promise<IAdminLabData | unknown> => {
    try {
      const {
        adminLab: {
          meta: { sort, filters, page, size, textFields },
        },
        properties: { directions, postTypes, origins, statuses },
      } = getState() as RootStateType;
      const {
        data: { content, totalPages },
      } = await getPosts('all-posts', {
        params: {
          page,
          size,
          types: setFilter(filters.types, postTypes),
          directions: setFilter(filters.directions, directions),
          origins: setFilter(filters.origins, origins),
          statuses: setFilter(filters.statuses, statuses),
          sort: [`${sort.sortBy},${sort.order}`],
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
            modifiedViewsCounter: data + 4,
          };
        }),
      );
      const posts = {};
      postWithViews.forEach((post) => {
        if (posts && post.id) {
          posts[post.id] = post;
        }
      });
      return {
        totalPages,
        posts,
        postIds,
      };
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  },
);

export const deleteAdminPost = createAsyncThunk(
  'adminLab/deletePost',
  async (options: { id: number }, { rejectWithValue }) => {
    try {
      const { id } = options;
      await archivePost(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  },
);

export const setPostStatus = createAsyncThunk(
  'adminLab/setPostStatus',
  async (option: {id: number, postStatus: number}, { rejectWithValue, getState }) => {
    try{
      const {id, postStatus} = option;
      const  { adminLab: { data: { posts } } } = getState() as RootStateType;
      const setStatusOnPost = posts[id];
      await updatePost({...setStatusOnPost, postStatus, authorId: setStatusOnPost.author.id});
      return { id, status: postStatus }
    }catch(error){
      return rejectWithValue(error.response?.data);
    }
  }
);
