/* eslint-disable @typescript-eslint/no-unsafe-member-access, consistent-return */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getNewestPostsForMobile } from '../../old/lib/utilities/API/api';

export const fetchNewestMobile = createAsyncThunk(
  'materials/mobile',
  async (_, { rejectWithValue }) => {
    try {
      const res = await getNewestPostsForMobile();
      const [expertOpinion, media, translation, video] = res.data.content;
      return [expertOpinion, translation, media, video];
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  },
);
