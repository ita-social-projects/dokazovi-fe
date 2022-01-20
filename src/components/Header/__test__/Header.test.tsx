import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { ScreenContext } from 'old/provider/MobileProvider/ScreenContext';
import { AuthContext } from 'old/provider/AuthProvider/AuthContext';
import { Provider } from 'react-redux';
import { Router, BrowserRouter } from 'react-router-dom';
import { store } from '../../../models/store';

import { Header } from '../Header';

describe('Header component tests', () => {
  const renderComponentWithRouter = () => {
    const history = createMemoryHistory();

    render(
      <Provider store={store}>
        <Router history={history}>
          <Header />
        </Router>
      </Provider>,
    );

    return { history };
  };

  const mapClickItem = (query: RegExp | string, path = '') => {
    const { history } = renderComponentWithRouter();
    if (path) {
      history.location.pathname = path;
    }
    const item = screen.queryByText(query) as HTMLElement;
    userEvent.click(item);
    expect(history.length).toBe(2);

    return history;
  };

  test('header should be rendered without issues', () => {
    const { asFragment } = render(
      <Provider store={store}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </Provider>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('header should be rendered with "create" and "profile" if authenticated', () => {
    const { asFragment } = render(
      <AuthContext.Provider
        value={{
          authenticated: true,
          setAuthorization: () => {},
          removeAuthorization: () => {},
          checkPermission: () => false,
        }}
      >
        <Provider store={store}>
          <BrowserRouter>
            <Header />
          </BrowserRouter>
        </Provider>
      </AuthContext.Provider>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('click on Materials should redirect to the materials page', () => {
    const history = mapClickItem(/матеріали/i, '');
    expect(history.location.pathname).toBe('/materials');
  });

  test('click on Authors should redirect to the experts page', () => {
    const history = mapClickItem(/автори/i, '');
    expect(history.location.pathname).toBe('/experts');
  });

  test('click on Main should redirect to the main page', () => {
    const history = mapClickItem(/головна/i, '/experts');
    expect(history.location.pathname).toBe('/');
  });

  test('click on Logo should redirect to the main page', () => {
    const history = mapClickItem(/доказові/i, '/experts');
    expect(history.location.pathname).toBe('/');
  });

  test('mobile version should be rendered correctly', () => {
    const { asFragment } = render(
      <ScreenContext.Provider value={{ mobile: true, tablet: null }}>
        <Provider store={store}>
          <BrowserRouter>
            <Header />
          </BrowserRouter>
        </Provider>
      </ScreenContext.Provider>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
