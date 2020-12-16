/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ExpertRegionType, IFilter, IPostType } from '../lib/types';
import { getPostTypes, getRegions } from '../lib/utilities/API/api';
import type { AppThunkType } from './store';

export interface IPropertiesState {
  postTypes: IPostType[];
  regions: ExpertRegionType[];
}

const initialState: IPropertiesState = {
  postTypes: [],
  regions: [],
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
  },
});

export const { loadPostsTypes, loadRegions } = propertiesSlice.actions;

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
