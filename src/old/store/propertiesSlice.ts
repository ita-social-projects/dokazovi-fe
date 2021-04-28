/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  getTagsByValue,
  getPostTypes,
  getRegions,
  getDirections,
} from '../lib/utilities/API/api';
import { IPostTag, IPostType, IDirection, IRegion } from '../lib/types';

import type { AppThunkType } from './store';

export interface IPropertiesState {
  postTypes: IPostType[];
  regions: IRegion[];
  postTags: IPostTag[];
  directions: IDirection[];
}

const initialState: IPropertiesState = {
  postTypes: [],
  regions: [],
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
    loadRegions: (state, action: PayloadAction<IRegion[]>) => {
      state.regions = action.payload;
    },
    loadPostsTags: (state, action: PayloadAction<IPostTag[]>) => {
      state.postTags = action.payload;
    },
    loadDirections: (state, action: PayloadAction<IDirection[]>) => {
      state.directions = action.payload;
    },
  },
});

export const {
  loadPostsTypes,
  loadRegions,
  loadPostsTags,
  loadDirections,
} = propertiesSlice.actions;

export default propertiesSlice.reducer;

export const fetchRegions = (): AppThunkType => async (dispatch) => {
  const response = await getRegions();
  const regions = response.data;
  dispatch(loadRegions(regions));
};

export const fetchPostsTypes = (): AppThunkType => async (dispatch) => {
  const response = await getPostTypes();
  const postTypes = response.data;

  dispatch(loadPostsTypes(postTypes));
};

export const fetchPostsTags = (tag: string): AppThunkType => async (
  dispatch,
) => {
  const response = await getTagsByValue({
    params: {
      value: tag,
    },
  });
  const postTags = response.data;
  dispatch(loadPostsTags(postTags));
};

export const fetchDirections = (): AppThunkType => async (dispatch) => {
  const response = await getDirections();
  const directions = response.data;
  dispatch(loadDirections(directions));
};
