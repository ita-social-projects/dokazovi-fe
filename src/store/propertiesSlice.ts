/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ExpertRegionType, IFilter, IPostTag, IPostType } from '../lib/types';
import { getPostTypes, getRegions, getTag } from '../lib/utilities/API/api';
import type { AppThunkType } from './store';

export interface IPropertiesState {
  postTypes: IPostType[];
  regions: ExpertRegionType[];
  postTags: IPostTag[];
}

const initialState: IPropertiesState = {
  postTypes: [],
  regions: [],
  postTags: [],
};

export const propertiesSlice = createSlice({
  name: 'properties',
  initialState,
  reducers: {
    loadPostsTypes: (state, action: PayloadAction<IPostType[]>) => {
      state.postTypes = action.payload;
    },
    loadRegions: (state, action: PayloadAction<ExpertRegionType[]>) => {
      state.regions = action.payload;
    },
    loadPostsTags: (state, action: PayloadAction<IPostTag[]>) => {
      state.postTags = action.payload;
    },
  },
});

export const {
  loadPostsTypes,
  loadRegions,
  loadPostsTags,
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

export const fetchPostsTags = (tagValue: string): AppThunkType => async (
  dispatch,
) => {
  const response = await getTag({
    params: {
      value: tagValue,
    },
  });
  const postTags = response.data;
  dispatch(loadPostsTags(postTags));
};
