import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAuthorities } from '../../old/lib/utilities/API/api';

export const getAuthoritiesAsyncAction = createAsyncThunk(
  'getAuthoritiesAsyncAction',
  async (_, { rejectWithValue }) => {
    try {
      const authorities = await getAuthorities();
      return authorities.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  },
);
