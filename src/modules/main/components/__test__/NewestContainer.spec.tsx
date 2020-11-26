import React from 'react';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import NewestContainer from '../NewestContainer';
import { store } from '../../../../store/store';
import MOCK_NEWEST from '../constants/newestPosts-mock';
import { fetchNewestPosts, loadNewest } from '../../store/mainSlice';

import { LOAD_POSTS_LIMIT } from '../constants/newestPostsPagination-config';

describe('newest', () => {
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

  it('state posts number equal to posts mock number', () => {
    const newState = loadNewest({
      newestPosts: MOCK_NEWEST,
      meta: { currentIndex: 0 },
    });

    expect(newState.payload.newestPosts.length).toEqual(MOCK_NEWEST.length);
  });

  it('appended posts equal on LIMIT number', () => {
    const prevState = store.getState().main.newest.newestPosts.length;

    store.dispatch(fetchNewestPosts());

    const newState = store.getState().main.newest.newestPosts.length;

    expect(newState).toEqual(prevState + LOAD_POSTS_LIMIT);
  });

  it('showMore is equal to false whe currentIndex >= total posts number', () => {
    store.dispatch(
      loadNewest({
        newestPosts: MOCK_NEWEST,
        meta: { currentIndex: MOCK_NEWEST.length - LOAD_POSTS_LIMIT },
      }),
    );

    store.dispatch(fetchNewestPosts());

    const { showMore } = store.getState().main.newest.meta;
    expect(showMore).toBeFalsy();
  });
});
