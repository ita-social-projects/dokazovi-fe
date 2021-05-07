/* eslint-disable */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getPosts } from '../../lib/utilities/API/api';
import { LOAD_POSTS_LIMIT } from '../../lib/constants/posts';
import { IPost, LoadingStatusEnum } from '../../lib/types';
import { PostResponseType } from '../../lib/utilities/API/types';
import { IFetchMaterialsOptions } from './types';

export const mapFetchedPosts = (
  posts: PostResponseType[],
): { mappedPosts: IPost[]; ids: number[] } => {
  const ids: number[] = posts.map((post) => post.id);

  return { mappedPosts: posts, ids };
};

export const fetchMaterials = createAsyncThunk(
  'materials/fetchMaterials',
  async (options: IFetchMaterialsOptions, { dispatch, getState }) => {
    const { filters, page, appendPosts } = options;

    const response = await getPosts('latest', {
      params: {
        page: page,
        size: LOAD_POSTS_LIMIT,
        type: filters.postTypes,
        directions: filters.directions,
      },
    });

    const {
      materials: { data },
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
      meta: {
        isLastPage: response.data.last,
        loading: LoadingStatusEnum.succeeded,
        error: null,
        pageNumber: response.data.number,
        totalElements: response.data.totalElements,
        totalPages: response.data.totalPages,
      },
    };
  },
);
