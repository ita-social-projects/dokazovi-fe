/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPost } from '../lib/types';

interface IDataState {
  // add byId / allIds?
  posts: {
    [id: string]: IPost;
  };
}

const initialState: IDataState = {
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
  },
});

export default dataSlice.reducer;

export const { loadPosts } = dataSlice.actions;

// create selector?
