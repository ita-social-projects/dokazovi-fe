/* eslint-disable */
import {
  getDirections,
  getOrigins,
  getPostTypes,
  getRegions,
  getTagsByValue,
} from '../../old/lib/utilities/API/api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchRegions = createAsyncThunk(
  'properties/fetchRegions',
  async () => {
    const response = await getRegions();
    return response.data;
  },
);

export const fetchPostsTypes = createAsyncThunk(
  'properties/fetchPostsTypes',
  async () => {
    const response = await getPostTypes();
    return response.data;
  },
);

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

export const fetchDirections = createAsyncThunk(
  'properties/fetchDirections',
  async () => {
    const response = await getDirections();
    return response.data;
  },
);

export const fetchOrigins = createAsyncThunk(
  'properties/fetchOrigins',
  async () => {
    const response = await getOrigins();
    return response.data;
  },
);
