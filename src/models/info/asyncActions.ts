/* eslint no-param-reassign: "error" */
import { AsyncThunk, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { LoadingStatusEnum } from '../../old/lib/types';
import {
  getPlatformInformation,
  updatePlatformInformation,
} from '../../old/lib/utilities/API/api';
import {
  PlatformInformationType,
  UpdatePlatformInformationRequestType,
} from '../../old/lib/utilities/API/types';
import { IInfoState } from './types';

export const fetchInfoById = createAsyncThunk(
  'info/fetchConditions',
  async (data: { id: number }, { rejectWithValue }) => {
    try {
      const response = await getPlatformInformation(data.id);
      return response.data;
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      return rejectWithValue(err.response?.data);
    }
  },
);

export const updateInfo = createAsyncThunk(
  'info/updateConditions',
  async (data: UpdatePlatformInformationRequestType, { rejectWithValue }) => {
    try {
      const response = await updatePlatformInformation(data);
      return response.data;
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      return rejectWithValue(err.response?.data);
    }
  },
);

export const getAsyncActionsInfoReducer = (
  asyncAction: AsyncThunk<any, void, Record<string, unknown>>,
) => ({
  [asyncAction.pending.type]: (
    state: IInfoState,
    action: { meta: { arg: { id: number } } },
  ) => {
    state[action.meta.arg.id].loading = LoadingStatusEnum.pending;
  },
  [asyncAction.fulfilled.type]: (
    state: IInfoState,
    action: PayloadAction<PlatformInformationType>,
  ) => {
    state[action.payload.id].data = action.payload;
    state[action.payload.id].loading = LoadingStatusEnum.succeeded;
  },
  [asyncAction.rejected.type]: (
    state: IInfoState,
    action: { meta: { arg: { id: number } }; payload: { error: string } },
  ) => {
    state[action.meta.arg.id].loading = LoadingStatusEnum.failed;
    state[action.meta.arg.id].error = action.payload.error;
  },
});
