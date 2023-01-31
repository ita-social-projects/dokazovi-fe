/* eslint-disable */
import {
  getDirections,
  getOrigins,
  getPostTypes,
  getRegions,
  getTagsByValue,
  getCities,
} from '../../old/lib/utilities/API/api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchRegions = createAsyncThunk(
  'properties/fetchRegions',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getRegions();
      return response.data;
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
