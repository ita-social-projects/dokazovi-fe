import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from 'models/store';
import { MemoryRouter } from 'react-router-dom';
import { configureStore, createSlice, combineReducers } from '@reduxjs/toolkit';
import { AuthContext } from 'old/provider/AuthProvider/AuthContext';
import { IUserState } from 'models/user/types';
import { LoadingStatusEnum } from 'old/lib/types';
import { IAuthority } from 'models/authorities/types';
import AdminPageWrapper from '../AdminPageWrapper';

const MOCKED_STORE = {
  currentUser: {
    loading: LoadingStatusEnum.idle,
    error: null,
    data: {
      id: 1,
      bio: 'Lorem ipsum dolor',
      avatar: '',
      firstName: 'Gregory',
      lastName: 'House',
      mainInstitution: {
        city: {
          id: 1,
          name: 'Київ',
        },
        id: 1,
        name: 'Адоніс',
      },
    },
  },
  authorities: {
    loading: LoadingStatusEnum.succeeded,
    error: null,
    data: ['SET_IMPORTANCE'],
  },
};

const AuthContextMock = {
  authenticated: true,
  setAuthorization: jest.fn(),
  removeAuthorization: jest.fn(),
  checkPermission: jest.fn(),
};

// describe('should render AdminPageWrapper component if authorities  equal true', () => {
//   beforeEach(() => {
//     const mockCurrentUserInitialState: IUserState = MOCKED_STORE.currentUser;
//     const mockCurrentUser = createSlice({
//       name: 'mockCurrentUser',
//       initialState: mockCurrentUserInitialState,
//       reducers: {},
//     });

//     const mockAuthoritiesInitialState: IAuthority = MOCKED_STORE.authorities;
//     const mockAuthorities = createSlice({
//       name: 'mockAuthorities',
//       initialState: mockAuthoritiesInitialState,
//       reducers: {},
//     });

//     const mockStore = configureStore({
//       reducer: combineReducers({
//         currentUser: mockCurrentUser.reducer,
//         authorities: mockAuthorities.reducer,
//       }),
//     });

//     render(
//       <Provider store={mockStore}>
//         <MemoryRouter>
//           <AuthContext.Provider value={AuthContextMock}>
//             <AdminPageWrapper />
//           </AuthContext.Provider>
//         </MemoryRouter>
//       </Provider>,
//     );
//   });

//   it('should render heading content element with text', () => {
//     expect(screen.getByText(/Налаштування:/i)).toBeInTheDocument();
//   });

//   it('should render content span element with text', () => {
//     expect(screen.getByText(/Головна/i)).toBeInTheDocument();
//   });

//   it('should render content span element with text', () => {
//     expect(screen.getByText(/Важливе/i)).toBeInTheDocument();
//   });

//   it('should render content span element with text', () => {
//     expect(
//       screen.getByText(/Оберіть об'єкт налаштування у меню/i),
//     ).toBeInTheDocument();
//   });
// });

describe('should render AdminPageWrapper component if authorities constant equal false', () => {
  it('should render Heading with error text', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <AdminPageWrapper />
        </MemoryRouter>
      </Provider>,
    );
    expect(
      screen.getByText(/На жаль, таку сторінку не знайдено./i),
    ).toBeInTheDocument();
  });
});
