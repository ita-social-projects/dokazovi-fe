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

export const propertiesSlice = createSlice({
  name: 'properties',
  initialState,
  reducers: {
    loadPostsTypes: (state, action: PayloadAction<IPostType[]>) => {
      state.postTypes = action.payload;
    },
  },
});

export const { loadPostsTypes } = propertiesSlice.actions;

export default propertiesSlice.reducer;

export const fetchPostsTypes = (): AppThunkType => async (dispatch) => {
  const response = await getPostTypes();
  const postTypes = response.data;

  dispatch(loadPostsTypes(postTypes));
};
