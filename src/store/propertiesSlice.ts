/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getTag, getPostTypes} from '../lib/utilities/API/api';
import { IPostTag, IPostType } from '../lib/types';

import type { AppThunkType } from './store';

export interface ITypesState {
  postTypes: IPostType[];
  postTags: IPostTag[];
}

const initialState: ITypesState = {
  postTypes: [],
  postTags: [],
};

export const propertiesSlice = createSlice({
  name: 'properties',
  initialState,
  reducers: {
    loadPostsTypes: (state, action: PayloadAction<IPostType[]>) => {
      state.postTypes = action.payload;
    },
    loadPostsTags: (state, action: PayloadAction<IPostTag[]>) => {
      state.postTags = action.payload;
    },
  },
});

export const { loadPostsTypes, loadPostsTags } = propertiesSlice.actions;

export default propertiesSlice.reducer;

export const fetchPostsTypes = (): AppThunkType => async (dispatch) => {
  const response = await getPostTypes();
  const postTypes = response.data;

  dispatch(loadPostsTypes(postTypes));
};

export const fetchPostsTags = (): AppThunkType => async (dispatch) => {
  const response = await getTag({
    params: {
      value: 'а',
    },
  });
  const postTags = response.data;
  dispatch(loadPostsTags(postTags));
};
