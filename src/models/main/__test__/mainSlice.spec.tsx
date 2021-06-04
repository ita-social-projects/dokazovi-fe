/* eslint-disable */
import { IMainState } from '../types';
import { mainSlice } from '../reducers';
import { fetchImportantPosts } from '../asyncActions';
import { RootStateType } from '../../../old/store/rootReducer';
import { LoadingStatusEnum } from '../../../old/lib/types';

const initialState: IMainState = {
  important: {
    importantPostIds: [],
    importantPosts: {},
  },
  newest: {
    newestPostIds: [],
    newestPosts: {},
  },
  loading: LoadingStatusEnum.idle,
  error: null,
};

describe('important', () => {
  it('should set loading state on pending when API call is pending', () => {
    const newState = mainSlice.reducer(
      initialState,
      fetchImportantPosts.pending,
    );
    const rootState: RootStateType['main'] = { ...newState };
    expect(rootState.loading).toEqual('pending');
  });

  it('should set loading state on succeeded when API call is pending', async () => {
    const newState = mainSlice.reducer(initialState, {
      type: fetchImportantPosts.fulfilled,
      payload: { importantPostIds: [1, 2, 3, 4] },
    });
    const rootState: RootStateType['main'] = { ...newState };
    expect(rootState.loading).toEqual('succeeded');
    expect(rootState.important.importantPostIds).toEqual([1, 2, 3, 4]);
  });

  it('should set loading state on failed when API call is rejected', async () => {
    const newState = mainSlice.reducer(initialState, {
      type: fetchImportantPosts.rejected,
      payload: { message: 'Network Error' },
    });
    const rootState: RootStateType['main'] = { ...newState };
    expect(rootState.loading).toEqual('failed');
    expect(rootState.error).toMatch(/Network Error/i);
  });
});
