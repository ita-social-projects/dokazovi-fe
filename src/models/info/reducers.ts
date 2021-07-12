/* eslint-disable */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  fetchInfoById,
  getAsyncActionsInfoReducer,
  updateInfo,
} from './asyncActions';
import { LoadingStatusEnum } from '../../old/lib/types';
import { IInfoState } from './types';
import { PlatformInformationType } from '../../old/lib/utilities/API/types';

const initialState: IInfoState = {
  1: {
    loading: LoadingStatusEnum.idle,
    error: null,
  },
  2: {
    loading: LoadingStatusEnum.idle,
    error: null,
  },
  3: {
    loading: LoadingStatusEnum.idle,
    error: null,
  },
  isFetchedAll: false,
};

export const InfoSlice = createSlice({
  name: 'conditions',
  initialState,
  reducers: {
    setInfo: (state, action: PayloadAction<PlatformInformationType>) => {
      state[action.payload.id].data = action.payload;
    },
  },
  extraReducers: {
    ...getAsyncActionsInfoReducer(fetchInfoById as any),
    ...getAsyncActionsInfoReducer(updateInfo as any),
  },
});

export const { setInfo } = InfoSlice.actions;

export const infoReducer = InfoSlice.reducer;
