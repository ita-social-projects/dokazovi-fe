import { createSlice } from '@reduxjs/toolkit';
import { getAsyncActionsReducer } from '../helpers/asyncActions';
import { fetchNewestMobile } from './asyncActions';
import { IMobileMaterials } from './types';

const initialState: IMobileMaterials = {
  data: [],
};

export const mobileMaterialsSlice = createSlice({
  name: 'materials',
  initialState,
  reducers: {
    resetMobileMaterials: (state) => {
      state.data.splice(0);
    },
  },
  extraReducers: {
    ...getAsyncActionsReducer(fetchNewestMobile as any),
  },
});

export const { resetMobileMaterials } = mobileMaterialsSlice.actions;

export const mobileMaterialsReducer = mobileMaterialsSlice.reducer;
