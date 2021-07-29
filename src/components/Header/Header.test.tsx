import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Header } from './Header';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { AuthContext } from '../../old/provider/AuthProvider/AuthContext';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({
  currentUser: {
    data: {
      id: 12,
      firstName: 'Sash',
      lastName: 'Nabokin',
      avatar: '',
      qualification: '',
      phone: '123',
      email: '1@ssd.com',
      bio: '',
      mainInstitution: undefined,
      mainDirection: undefined,
      directions: [],
      lastAddedPost: {
        id: 2,
        title: 'Asar',
      },
      socialNetwork: undefined,
    },
  },
});
const history = createMemoryHistory();

test('component renders properly', () => {
  render(
    <Router history={history}>
      <Header />
    </Router>,
  );

  expect(screen.getByTestId('header')).toBeInTheDocument();
  expect(screen.getByTestId('header')).toMatchSnapshot();
});

test('should show login button if user unauthenticated', () => {
  const newTestContext = {
    authenticated: false,
    setAuthorization: () => {},
    removeAuthorization: () => {},
    checkPermission: () => false,
  };
  render(
    <Router history={history}>
      <AuthContext.Provider value={newTestContext}>
        <Header />
      </AuthContext.Provider>
    </Router>,
  );

  expect(screen.getByText('Увійти')).toBeInTheDocument();
});

test('it should show account menu & post creation menu if user authenticated', () => {
  const testContext = {
    authenticated: true,
    setAuthorization: () => {},
    removeAuthorization: () => {},
    checkPermission: () => false,
  };
  render(
    <Provider store={store}>
      <Router history={history}>
        <AuthContext.Provider value={testContext}>
          <Header />
        </AuthContext.Provider>
      </Router>
    </Provider>,
  );

  expect(screen.getByText('Створити...')).toBeInTheDocument();
  expect(screen.getByText('Sash')).toBeInTheDocument();
});
