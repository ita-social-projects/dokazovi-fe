/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getTag, getPostTypes, getDirection} from '../lib/utilities/API/api';
import { IPostTag, IPostType, IDirection } from '../lib/types';

import type { AppThunkType } from './store';

export interface ITypesState {
  postTypes: IPostType[];
  postTags: IPostTag[];
  directions: IDirection[]; 
}

const initialState: ITypesState = {
  postTypes: [],
  postTags: [],
  directions: [],
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
    loadDirections: (state, action: PayloadAction<IDirection[]>) => {
      state.directions = action.payload;
    },
  },
});

export const { loadPostsTypes, loadPostsTags, loadDirections } = propertiesSlice.actions;

export default propertiesSlice.reducer;

export const fetchPostsTypes = (): AppThunkType => async (dispatch) => {
  const response = await getPostTypes();
  const postTypes = response.data;

  dispatch(loadPostsTypes(postTypes));
};

export const fetchPostsTags = (tagValue: string): AppThunkType => async (dispatch) => {
  const response = await getTag({
    params: {
      value: tagValue,
    },
  });
  const postTags = response.data;
  dispatch(loadPostsTags(postTags));
};

export const fetchDirections = (): AppThunkType => async (dispatch) => {
  const response = await getDirection();
  const direction = response.data;
  dispatch(loadDirections(direction));
};
