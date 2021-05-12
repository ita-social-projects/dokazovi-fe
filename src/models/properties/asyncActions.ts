/* eslint-disable */
import {
  loadDirections,
  loadOrigins,
  loadPostsTags,
  loadPostsTypes,
  loadRegions,
} from './reducers';
import {
  getDirections,
  getOrigins,
  getPostTypes,
  getRegions,
  getTagsByValue,
} from '../../old/lib/utilities/API/api';
import { createAsyncThunk } from '@reduxjs/toolkit';

// export const fetchRegionsxxx = (): AppThunkType => async (dispatch) => {
//     const response = await getRegions();
//     const regions = response.data;
//     dispatch(loadRegions(regions));
// };

export const fetchRegions = createAsyncThunk(
  'properties/fetchRegions',
  async () => {
    const response = await getRegions();
    return response.data;
  },
);

// export const fetchPostsTypesxxx = (): AppThunkType => async (dispatch) => {
//     const response = await getPostTypes();
//     const postTypes = response.data;
//
//     dispatch(loadPostsTypes(postTypes));
// };

export const fetchPostsTypes = createAsyncThunk(
  'properties/fetchPostsTypes',
  async () => {
    const response = await getPostTypes();
    return response.data;
  },
);

// export const fetchPostsTags = (tag: string): AppThunkType => async (
//     dispatch,
// ) => {
//     const response = await getTagsByValue({
//         params: {
//             value: tag,
//         },
//     });
//     const postTags = response.data;
//     dispatch(loadPostsTags(postTags));
// };

export const fetchPostsTags = createAsyncThunk(
  'properties/fetchPostsTags',
  async (tag: string) => {
    const response = await getTagsByValue({
      params: {
        value: tag,
      },
    });
    return response.data;
  },
);

// export const fetchDirectionsxxx = (): AppThunkType => async (dispatch) => {
//     const response = await getDirections();
//     const directions = response.data;
//     dispatch(loadDirections(directions));
// };

export const fetchDirections = createAsyncThunk(
  'properties/fetchDirections',
  async () => {
    const response = await getPostTypes();
    return response.data;
  },
);

// export const fetchOriginsxxx = (): AppThunkType => async (dispatch) => {
//     const response = await getOrigins();
//     const origins = response.data;
//     dispatch(loadOrigins(origins));
// };

export const fetchOrigins = createAsyncThunk(
  'properties/fetchOrigins',
  async () => {
    const response = await getPostTypes();
    return response.data;
  },
);
