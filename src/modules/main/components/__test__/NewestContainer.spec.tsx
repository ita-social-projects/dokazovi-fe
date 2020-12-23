/* eslint-disable @typescript-eslint/no-floating-promises */
import React from 'react';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import NewestContainer from '../NewestContainer';
import { store } from '../../../../store/store';
import { fetchNewestPosts, IMainState, mainSlice } from '../../store/mainSlice';

import { RootStateType } from '../../../../store/rootReducer';
import { LoadingStatusEnum } from '../../../../lib/types';

const initialState: IMainState = {
  newest: {
    newestPosts: [],
    meta: {
      currentPage: 0,
      isLastPage: false,
      loading: LoadingStatusEnum.idle,
      error: null,
    },
  },
  important: {
    importantPosts: [],
    meta: {
      loading: LoadingStatusEnum.failed,
      error: '',
    },
  },
  experts: {
    experts: [],
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
