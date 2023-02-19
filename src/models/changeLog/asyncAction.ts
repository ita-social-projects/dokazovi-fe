import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchChangeLog } from 'old/lib/utilities/API/api';
import { IChangeLogOptions } from './types';

export const getChangeLog = createAsyncThunk(
  'getChangeLogActions',
  async (options: IChangeLogOptions, { rejectWithValue }) => {
    try {
      const { data } = await fetchChangeLog(options);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
