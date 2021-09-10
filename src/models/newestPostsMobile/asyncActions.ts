import { createAsyncThunk } from '@reduxjs/toolkit';
import { getNewestPostsForMobile } from '../../old/lib/utilities/API/api';

export const fetchNewestMobile = createAsyncThunk(
  'materials/mobile',
  async () => {
    try {
      const res = await getNewestPostsForMobile();
      return res.data.content;
    } catch (err) {}
  },
);
