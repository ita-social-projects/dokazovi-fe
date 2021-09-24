/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { IVisibilityState } from './types';

const initialState: IVisibilityState = {
  visibility: false,
};

export const visibilitySlice = createSlice({
  name: 'HeaderVisibility',
  initialState,
  reducers: {
    makeHeaderVisible: (state) => {
      state.visibility = true;
    },
    makeHeaderInvisible: (state) => {
      state.visibility = false;
    },
  },
});

export const { makeHeaderInvisible, makeHeaderVisible } = visibilitySlice.actions;
export const headerVisibilityReducer = visibilitySlice.reducer;
