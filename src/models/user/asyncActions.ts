import { createAsyncThunk } from '@reduxjs/toolkit';
import { getCurrentUser } from '../../old/lib/utilities/API/api';

export const getUserAsyncAction = createAsyncThunk(
  'getUserAsyncAction',
  async () => {
    const user = await getCurrentUser();
    return user.data;
  },
);
