/* eslint no-param-reassign: "error" */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* @typescript-eslint/no-inferrable-types */
/* eslint-disable */
import { AsyncThunk, SerializedError, PayloadAction } from '@reduxjs/toolkit';
import { LoadingStatusEnum } from '../../old/lib/types';

export const getAsyncActionsReducer = (
  asyncAction: AsyncThunk<any, void, Record<string, unknown>>,
  key = 'data',
  loadingKey: null | string = null,
) => ({
  [asyncAction.pending.type]: (state: any) => {
    switch (loadingKey) {
      case null:
        state.loading = LoadingStatusEnum.pending;
        break;
      default:
        state[loadingKey].loading = LoadingStatusEnum.pending;
    }
    state.loading = LoadingStatusEnum.pending;
  },
  [asyncAction.fulfilled.type]: (state: any, action: PayloadAction<any>) => {
    state.loading = LoadingStatusEnum.succeeded;
    state[key] = action.payload;
  },
  [asyncAction.rejected.type]: (
    state: any,
    error: PayloadAction<SerializedError>,
  ) => {
    state.loading = LoadingStatusEnum.failed;
    console.log(error);
    if (error.payload?.message) {
      state.error = error.payload.message;
    }
  },
});
