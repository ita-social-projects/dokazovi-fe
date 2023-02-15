import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchMaterialsChange } from 'old/lib/utilities/API/api';
import { IChangeLog } from './types';

export const getChangeLog = createAsyncThunk(
  'getChangeLogActions',
  async (options: IChangeLog, { rejectWithValue }) => {
    try {
      const { data } = await fetchMaterialsChange(options);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
