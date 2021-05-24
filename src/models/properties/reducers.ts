/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { IPropertiesState } from './types';
import {
  fetchDirections,
  fetchOrigins,
  fetchPostsTags,
  fetchPostsTypes,
  fetchRegions,
} from './asyncActions';
import { getAsyncActionsReducer } from '../helpers/asyncActions';

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
  reducers: {},
  extraReducers: {
    ...getAsyncActionsReducer(fetchRegions, 'regions'),
    ...getAsyncActionsReducer(fetchPostsTypes, 'postTypes'),
    ...getAsyncActionsReducer(fetchDirections, 'directions'),
    ...getAsyncActionsReducer(fetchOrigins, 'origins'),
    ...getAsyncActionsReducer(fetchPostsTags as any, 'postTags'),
  },
});

export const propertiesReducer = propertiesSlice.reducer;
