/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  IPostTag,
  IPostType,
  IDirection,
  IOrigin,
  IRegion,
} from '../../old/lib/types';
import { IPropertiesState } from './types';
import { getAsyncActionsReducer } from '../../old/store/helpers/asyncActions';
import {
  fetchDirections,
  fetchOrigins,
  fetchPostsTags,
  fetchPostsTypes,
  fetchRegions,
} from './asyncActions';

const initialState: IPropertiesState = {
  postTypes: [],
  regions: [],
  postTags: [],
  directions: [],
  origins: [],
};

const propertiesSlice = createSlice({
  name: 'properties',
  initialState,
  reducers: {
    // loadPostsTypes: (state, action: PayloadAction<IPostType[]>) => {
    //   state.postTypes = action.payload;
    // },
    // loadRegions: (state, action: PayloadAction<IRegion[]>) => {
    //   state.regions = action.payload;
    // },
    // loadPostsTags: (state, action: PayloadAction<IPostTag[]>) => {
    //   state.postTags = action.payload;
    // },
    // loadDirections: (state, action: PayloadAction<IDirection[]>) => {
    //   state.directions = action.payload;
    // },
    // loadOrigins: (state, action: PayloadAction<IOrigin[]>) => {
    //   state.origins = action.payload;
    // },
  },
  extraReducers: {
    ...getAsyncActionsReducer(fetchRegions, 'regions'),
    ...getAsyncActionsReducer(fetchPostsTypes, 'postTypes'),
    ...getAsyncActionsReducer(fetchDirections, 'directions'),
    ...getAsyncActionsReducer(fetchOrigins, 'origins'),
    ...getAsyncActionsReducer(fetchPostsTags as any, 'postTags'),
  },
});

// export const {
//   loadPostsTypes,
//   loadRegions,
//   loadPostsTags,
//   loadDirections,
//   loadOrigins,
// } = propertiesSlice.actions;

export const propertiesReducer = propertiesSlice.reducer;
