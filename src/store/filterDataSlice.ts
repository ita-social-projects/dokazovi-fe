/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPostType } from '../lib/types';
import { getPostTypes } from '../lib/utilities/API/api';
import type { AppThunkType } from './store';

export interface ITypesState {
  postTypes: IPostType[];
}

const initialState: ITypesState = {
  postTypes: [],
};

export const typesSlice = createSlice({
  name: 'types',
  initialState,
  reducers: {
    loadPostsTypes: (state, action: PayloadAction<IPostType[]>) => {
      state.postTypes = action.payload;
    },
  },
});

export const { loadPostsTypes } = typesSlice.actions;

export default typesSlice.reducer;

export const fetchPostsTypes = (): AppThunkType => async (dispatch) => {
  const response = await getPostTypes();
  const postTypes = response.data;

  dispatch(loadPostsTypes(postTypes));
};
