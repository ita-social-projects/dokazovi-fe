/* eslint-disable */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getPosts } from '../../old/lib/utilities/API/api';
import { LOAD_POSTS_LIMIT } from '../../old/lib/constants/posts';
import { IPost } from '../../old/lib/types';
import { PostResponseType } from '../../old/lib/utilities/API/types';
import { IFetchMaterialsOptions } from '../materials/types';

export const mapFetchedPosts = (
  posts: PostResponseType[],
): { mappedPosts: IPost[]; ids: number[] } => {
  const ids: number[] = posts.map((post) => post.id);

  return { mappedPosts: posts, ids };
};

export const fetchMaterialsImportant = createAsyncThunk(
  'materialsImportant/fetchMaterialsImportant',
  async (options: IFetchMaterialsOptions, { getState, rejectWithValue }) => {
    try {
      const {
        filters,
        page,
        appendPosts,
        url = 'get-by-important-image',
      } = options;
      const response = await getPosts(url, {
        params: {
          page: page,
          size: LOAD_POSTS_LIMIT,
          types: filters.postTypes,
          directions: filters.directions,
          origins: filters.origins,
        },
      });

      const {
        materialsImportant: { data },
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
