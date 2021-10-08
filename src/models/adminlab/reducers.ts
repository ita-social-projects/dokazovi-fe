/* eslint-disable */
import {
  createSlice,
  PayloadAction,
  ActionReducerMapBuilder,
} from '@reduxjs/toolkit';
import { getAsyncActionsReducer } from '../helpers/asyncActions';

import { IAdminlab, IAdminPost } from './types';
import { LoadingStatusEnum } from '../../old/lib/types';
import { getMatirealsAction } from './asyncActions';
// так можга тягнути перегляди getUniquePostViewsCounter

const initialState: IAdminlab = {
  data: {
    postIds: [],
    posts: {},
  },
  error: '',
  loading: LoadingStatusEnum.idle,
};

const adminlabSlice = createSlice({
  name: 'adminlab',
  initialState,
  reducers: {
    editPost: (state, action: PayloadAction<IAdminPost>) => {
      const editedPostID = action.payload.id;
      state.data.posts = {
        ...state.data.posts,
        [editedPostID]: action.payload,
      };
    },
  },
  extraReducers: {
    ...getAsyncActionsReducer(getMatirealsAction),
  },
});

export const { editPost } = adminlabSlice.actions;
export const adminlabReducer = adminlabSlice.reducer;
