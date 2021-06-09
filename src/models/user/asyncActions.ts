/* eslint-disable */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getCurrentUser } from '../../old/lib/utilities/API/api';

export const getUserAsyncAction = createAsyncThunk(
  'getUserAsyncAction',
  async (_, { rejectWithValue }) => {
    try {
      const user = await getCurrentUser();
      return user.data;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  },
);
