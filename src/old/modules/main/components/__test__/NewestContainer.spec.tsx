/* eslint-disable */
import { fetchNewestPosts } from '../../../../../models/main';
import { IMainState } from '../../../../../models/main/types';
import { mainSlice } from '../../../../../models/main/reducers';
import { RootStateType } from '../../../../store/rootReducer';
import { LoadingStatusEnum } from '../../../../lib/types';

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

describe('newest', () => {
  it('should set loading state on pending when API call is pending', () => {
    const newState = mainSlice.reducer(initialState, fetchNewestPosts.pending);

    const rootState: RootStateType['main'] = { ...newState };

    expect(rootState.loading).toEqual('pending');
  });

  it('should set loading state on succeeded when API call is pending', async () => {
    const newState = mainSlice.reducer(initialState, {
      type: fetchNewestPosts.fulfilled,
      payload: { newestPostIds: [1, 2, 3, 4] },
    });

    const rootState: RootStateType['main'] = { ...newState };

    expect(rootState.loading).toEqual('succeeded');
    expect(rootState.newest.newestPostIds).toEqual([1, 2, 3, 4]);
  });

  it('should set loading state on failed when API call is rejected', () => {
    const newState = mainSlice.reducer(initialState, {
      type: fetchNewestPosts.rejected,
      error: 'Network Error',
    });

    const rootState: RootStateType['main'] = { ...newState };

    expect(rootState.loading).toEqual('failed');
  });
});
