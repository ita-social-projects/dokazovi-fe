import React from 'react';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { MainExpertsView } from '../MainExpertsView';
import { store } from '../../../../store/store';

describe('MainExpertsView', () => {
  it('renders images', () => {
    render(
      <Provider store={store}>
        <MainExpertsView />
      </Provider>,
    );
    const resultLength = store.getState().main.experts.length;
    const images = screen.queryAllByAltText('doctor');
    expect(images).toHaveLength(resultLength);
  });
});
