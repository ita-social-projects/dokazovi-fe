import { createSlice } from '@reduxjs/toolkit';
import { getAsyncActionsReducer } from '../helpers/asyncActions';
import { getAuthoritiesAsyncAction } from './asyncAction';
import { LoadingStatusEnum } from '../../old/lib/types';

const initialState = {
  data: [],
  loading: LoadingStatusEnum.idle,
  error: null,
};

const authoritiesSlice = createSlice({
  name: 'authority',
  initialState,
  reducers: {
    clearAuthoritiesAction: (state) => {
      state.data.splice(0);
    },
  },
  extraReducers: {
    ...getAsyncActionsReducer(getAuthoritiesAsyncAction),
  },
});

const authoritiesReducer = authoritiesSlice.reducer;
const { clearAuthoritiesAction } = authoritiesSlice.actions;

export { authoritiesReducer, clearAuthoritiesAction };
