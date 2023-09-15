/* eslint-disable */
import {
  getCities,
  getDirections,
  getOrigins,
  getPostTypes,
  getRegions,
  getTagsByValue,
} from '../../old/lib/utilities/API/api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { RegionResponseType } from '../../old/lib/utilities/API/types';

export const fetchRegions = createAsyncThunk(
  'properties/fetchRegions',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getRegions();
      const data = response.data.sort(
        (a: RegionResponseType, b: RegionResponseType) => {
          return a.name.localeCompare(b.name);
        },
      );
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  },
);

export const fetchCities = createAsyncThunk(
  'properties/fetchCities',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getCities();
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  },
);

export const fetchPostsTypes = createAsyncThunk(
  'properties/fetchPostsTypes',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getPostTypes();
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  },
);

export const fetchPostsTags = createAsyncThunk(
  'properties/fetchPostsTags',
  async (tag: string, { rejectWithValue }) => {
    try {
      const response = await getTagsByValue({
        params: {
          value: tag,
        },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  },
);

export const fetchDirections = createAsyncThunk(
  'properties/fetchDirections',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getDirections();
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  },
);

export const fetchOrigins = createAsyncThunk(
  'properties/fetchOrigins',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getOrigins();
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  },
);
