/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { PostStatusForApi } from '../../old/lib/types';
import { IPropertiesState } from './types';
import {
  fetchDirections,
  fetchOrigins,
  fetchPostsTags,
  fetchPostsTypes,
  fetchRegions,
  fetchCities,
} from './asyncActions';
import { getAsyncActionsReducer } from '../helpers/asyncActions';

const statuses = Object.keys(PostStatusForApi)
  .slice(0, 7)
  .map((key) => ({
    id: +key,
    name: PostStatusForApi[+key],
  }));

const initialState: IPropertiesState = {
  postTypes: [],
  regions: [],
  cities: [],
  postTags: [],
  directions: [],
  origins: [],
  statuses,
};

const propertiesSlice = createSlice({
  name: 'properties',
  initialState,
  reducers: {},
  extraReducers: {
    ...getAsyncActionsReducer(fetchRegions, 'regions'),
    ...getAsyncActionsReducer(fetchCities, 'cities'),
    ...getAsyncActionsReducer(fetchPostsTypes, 'postTypes'),
    ...getAsyncActionsReducer(fetchDirections, 'directions'),
    ...getAsyncActionsReducer(fetchOrigins, 'origins'),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...getAsyncActionsReducer(fetchPostsTags as any, 'postTags'),
  },
});

export const propertiesReducer = propertiesSlice.reducer;
