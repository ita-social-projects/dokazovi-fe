import { createSlice } from '@reduxjs/toolkit';
import { getAsyncActionsReducer } from '../helpers/asyncActions';
import { fetchNewestMobile } from './asyncActions';

const initialState = {
  data: {
    expertOpinion: {
      isLastPage: false,
      data: [],
    },
    translation: {
      isLastPage: false,
      data: [],
    },
    media: {
      isLastPage: false,
      data: [],
    },
    video: {
      isLastPage: false,
      data: [],
    },
  },
};

export const mobileMaterialsSlice = createSlice({
  name: 'materials',
  initialState,
  reducers: {
    resetMobileMaterials: (state) => {
      state.data = initialState.data;
    },
  },
  extraReducers: {
    ...getAsyncActionsReducer(fetchNewestMobile as any),
  },
});

export const { resetMobileMaterials } = mobileMaterialsSlice.actions;

export const mobileMaterialsReducer = mobileMaterialsSlice.reducer;
