/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FilterTypeEnum, IFilter } from '../../../lib/types';

export interface IPostCreationState {
  [FilterTypeEnum.DIRECTIONS]: IFilter;
}

const initialState: IPostCreationState = {
  [FilterTypeEnum.DIRECTIONS]: {
    value: [],
  },
};

export const postCreationSlice = createSlice({
  name: 'postCreation',
  initialState,
  reducers: {
    setPostDirections: (state, action: PayloadAction<IFilter>) => {
      state.DIRECTIONS = action.payload;
    },
  },
});

export const { setPostDirections } = postCreationSlice.actions;

export const postCreationReducer = postCreationSlice.reducer;
