/* eslint-disable */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getPosts } from '../../old/lib/utilities/API/api';
import {
  LOAD_IMPORTANT_POSTS_LIMIT,
  LOAD_POSTS_LIMIT,
} from '../../old/lib/constants/posts';
import { mapFetchedPosts } from '../materials';

export const fetchNewestPosts = createAsyncThunk(
  'main/loadNewestPosts',
  async (_, { getState, rejectWithValue }) => {
    try {
      const response = await getPosts('latest-all', {
        params: {
          size: LOAD_POSTS_LIMIT,
        },
      });

      const {
        main: { newest },
      } = getState() as any;

      const { mappedPosts, ids } = mapFetchedPosts(response.data.content);
      const newestPosts = { ...newest.newestPosts };
      mappedPosts.forEach((post) => {
        if (newestPosts && post.id) {
          newestPosts[post.id] = post;
        }
      });

      return {
        newestPostIds: ids,
        newestPosts,
      };
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  },
);

export const fetchImportantPosts = createAsyncThunk(
  'main/loadImportantPosts',
  async (_, { getState, rejectWithValue }) => {
    try {
      const response = await getPosts('important', {
        params: {
          size: LOAD_IMPORTANT_POSTS_LIMIT,
        },
      });

      const {
        main: { important },
      } = getState() as any;

      const { mappedPosts, ids } = mapFetchedPosts(response.data.content);
      const importantPosts = { ...important.importantPosts };
      mappedPosts.forEach((post) => {
        if (importantPosts && post.id) {
          importantPosts[post.id] = post;
        }
      });

      return {
        importantPostIds: ids,
        importantPosts,
      };
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  },
);
