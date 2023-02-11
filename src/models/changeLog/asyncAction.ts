import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchMaterialsChange } from 'old/lib/utilities/API/api';
import { IChangeLog } from './types';

export const getChangeLog = createAsyncThunk(
  'getChangeLogActions',
  async (options: IChangeLog, { rejectWithValue }) => {
    try {
      const changes = await fetchMaterialsChange(options);
      return changes.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);
