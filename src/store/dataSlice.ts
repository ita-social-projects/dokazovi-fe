/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import _ from 'lodash';
import { IExpert, IPost } from '../lib/types';
import { PostResponseType } from '../lib/utilities/API/types';

interface IDataState {
  experts: {
    [id: string]: IExpert;
  };
  posts: {
    [id: string]: IPost;
  };
}

const initialState: IDataState = {
  experts: {},
  posts: {},
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    loadPosts: (state, action: PayloadAction<IPost[]>) => {
      action.payload.forEach((post) => {
        if (post.id) {
          state.posts[post.id] = post;
        }
      });
    },
    loadExperts: (state, action: PayloadAction<IExpert[]>) => {
      action.payload.forEach((expert) => {
        if (expert.id) {
          state.experts[expert.id] = expert;
        }
      });
    },
  },
});

export default dataSlice.reducer;

export const { loadPosts, loadExperts } = dataSlice.actions;

export const mapFetchedPosts = (
  posts: PostResponseType[],
): { mappedPosts: IPost[]; ids: string[] } => {
  const ids: string[] = [];

  const mappedPosts = posts.map((post) => {
    ids.push(String(post.id));

    const postAuthor = {
      ..._.pick(post.author, [
        'id',
        'avatar',
        'firstName',
        'lastName',
        'mainInstitution',
      ]),
    };

    const preview = _.truncate(post.content, {
      length: 150,
    });

    return {
      author: postAuthor,
      createdAt: post.createdAt,
      directions: post.directions,
      title: post.title,
      postType: post.type,
      preview,
      id: post.id,
    };
  });

  return { mappedPosts, ids };
};
