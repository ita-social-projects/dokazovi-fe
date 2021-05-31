/* eslint-disable */
import { fetchNewestPosts } from '../../../../../models/main';
import { IMainState } from '../../../../../models/main/types';
import { mainSlice } from '../../../../../models/main/reducers';
import { RootStateType } from '../../../../store/rootReducer';
import { LoadingStatusEnum } from '../../../../lib/types';

const initialState: IMainState = {
  newest: {
    newestPostIds: [],
    meta: {
      currentPage: 0,
      isLastPage: false,
      loading: LoadingStatusEnum.idle,
      error: null,
    },
  },
  important: {
    importantPostIds: [],
    meta: {
      loading: LoadingStatusEnum.failed,
      error: '',
    },
  },
  experts: {
    expertIds: [],
    meta: { loading: LoadingStatusEnum.failed, error: '', pageNumber: 0 },
  },
};

describe('newest', () => {
  it('should set loading state on pending when API call is pending', () => {
    const newState = mainSlice.reducer(initialState, fetchNewestPosts.pending);

    const rootState: RootStateType['main'] = { ...newState };

    expect(rootState.newest.meta.loading).toEqual('pending');
  });

  // it('should set loading state on succeeded when API call is pending', async () => {
  //   await store.dispatch(fetchNewestPosts());
  //   expect(store.getState().main.newest.meta.loading).toEqual('succeeded');
  // });

  it('should set loading state on failed when API call is rejected', () => {
    const newState = mainSlice.reducer(initialState, {
      type: fetchNewestPosts.rejected,
      error: 'Network Error',
    });

    const rootState: RootStateType['main'] = { ...newState };

    expect(rootState.newest.meta.loading).toEqual('failed');
  });
});
