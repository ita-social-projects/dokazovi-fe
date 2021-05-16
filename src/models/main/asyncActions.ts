/* eslint-disable */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { IFetchNewestPosts } from './types';
import { getPosts } from '../../old/lib/utilities/API/api';
import {
  LOAD_IMPORTANT_POSTS_LIMIT,
  LOAD_POSTS_LIMIT,
} from '../../old/lib/constants/posts';
import { loadPosts, mapFetchedPosts } from '../materials';
import { LoadingStatusEnum } from '../../old/lib/types';

export const fetchNewestPosts = createAsyncThunk(
  'main/loadNewestPosts',
  async (_, { getState }) => {
    const response = await getPosts('latest', {
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
  },
);

export const fetchImportantPosts = createAsyncThunk(
  'main/loadImportantPosts',
  async (_, { getState }) => {
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
    // try {
    //     const posts = await getPosts('important', {
    //         params: {
    //             size: LOAD_IMPORTANT_POSTS_LIMIT,
    //         },
    //     });
    //
    //     const { mappedPosts, ids } = mapFetchedPosts(posts.data.content);
    //
    //     dispatch(loadPosts(mappedPosts));
    //
    //     dispatch(
    //         loadImportant({
    //             importantPostIds: ids,
    //             meta: {
    //                 loading: LoadingStatusEnum.succeeded,
    //                 error: null,
    //             },
    //         }),
    //     );
    // } catch (e) {
    //     dispatch(
    //         loadImportant({
    //             importantPostIds: [],
    //             meta: {
    //                 loading: LoadingStatusEnum.failed,
    //                 error: String(e),
    //             },
    //         }),
    //     );
    // }
  },
);
