/* eslint-disable @typescript-eslint/no-floating-promises */
import React from 'react';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import NewestContainer from '../NewestContainer';
import { store } from '../../../../store/store';
import { fetchNewestPosts, IMainState, mainSlice } from '../../store/mainSlice';

import { LOAD_POSTS_LIMIT } from '../constants/newestPostsPagination-config';
import { RootStateType } from '../../../../store/rootReducer';

const initialState: IMainState = {
  newest: {
    newestPosts: [],
    meta: {
      currentPage: 0,
      isLastPage: false,
    },
    loading: 'idle',
    error: null,
  },
  important: [],
  experts: [],
};

describe('newest', () => {
  it('should set loading state on pending when API call is pending', () => {
    const newState = mainSlice.reducer(initialState, fetchNewestPosts.pending);

    const rootState: RootStateType['main'] = { ...newState };

    expect(rootState.newest.loading).toEqual('pending');
  });

  it('should set loading state on succeeded when API call is pending', async () => {
    await store.dispatch(fetchNewestPosts());

    expect(store.getState().main.newest.loading).toEqual('succeeded');
  });
  it('should set loading state on failed when API call is rejected', () => {
    const newState = mainSlice.reducer(initialState, fetchNewestPosts.rejected);

    const rootState: RootStateType['main'] = { ...newState };

    expect(rootState.newest.loading).toEqual('failed');
  });

  it('initial render NewestContainer posts equal to LIMIT number', () => {
    render(
      <Provider store={store}>
        <NewestContainer />
      </Provider>,
    );

    const renderedPostCount = screen.getByText('Найновіше').nextElementSibling
      ?.childElementCount;

    expect(renderedPostCount).toEqual(LOAD_POSTS_LIMIT);
  });
});
