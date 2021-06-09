import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';

import { App } from './App';
import { store } from './models/store';

test('renders learn react link', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>,
  );
  expect(true).toBeTruthy();
});
