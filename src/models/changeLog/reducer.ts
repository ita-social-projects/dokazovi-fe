import { createSlice } from '@reduxjs/toolkit';
import { getAsyncActionsReducer } from 'models/helpers/asyncActions';
import { fetchMaterialsChange } from 'old/lib/utilities/API/api';
import { getChangeLog } from './asyncAction';

const initialState = {
  size: 0,
  pageNumber: 0,
};

const changeLog = createSlice({
  name: 'changesLog',
  initialState,
  reducers: {
    setChangesSize: (state, action) => {
      state.size = action.payload;
      state.pageNumber = initialState.pageNumber;
    },
  },
  extraReducers: {
    ...getAsyncActionsReducer(getChangeLog as any),
  },
});

export const { setChangesSize } = changeLog.actions;

export const changeLogReducer = changeLog.reducer;
