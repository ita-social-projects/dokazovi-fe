import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getAsyncActionsReducer } from 'models/helpers/asyncActions';
import { ChangeLogType } from 'old/lib/utilities/API/types';
import { getChangeLog } from './asyncAction';

const initialState: ChangeLogType = {
  size: 0,
  content: [],
};

const changeLog = createSlice({
  name: 'changesLog',
  initialState,
  reducers: {
    setChangesSize: (state, action: PayloadAction<number>) => {
      const setChangeObj = state;
      setChangeObj.size = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      const setPageObj = state;
      setPageObj.totalElements = action.payload;
    },
  },
  extraReducers: {
    ...getAsyncActionsReducer(getChangeLog as any),
  },
});

const { setChangesSize, setPage } = changeLog.actions;

const changeLogReducer = changeLog.reducer;
export { setChangesSize, setPage, changeLogReducer };
