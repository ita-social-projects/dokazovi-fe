/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IExpert, IPost } from '../old/lib/types';
import { PostResponseType } from '../old/lib/utilities/API/types';

export interface IDataState {
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
): { mappedPosts: IPost[]; ids: number[] } => {
  const ids: number[] = posts.map((post) => post.id);

  return { mappedPosts: posts, ids };
};
