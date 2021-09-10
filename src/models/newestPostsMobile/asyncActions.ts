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
      rejectWithValue(err.response?.data);
    }
  },
);
