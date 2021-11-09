import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from 'models/store';
import { MemoryRouter } from 'react-router-dom';
import { configureStore, createSlice, combineReducers } from '@reduxjs/toolkit';
import { AuthContext } from 'old/provider/AuthProvider/AuthContext';
import { IUserState } from 'models/user/types';
import { LoadingStatusEnum } from 'old/lib/types';
import { IAuthority } from 'models/authorities/types';
import { AccountMenu } from '../AccountMenu';

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

const openAccounMenu = () => {
  const accountMenuAvatar = screen.getAllByRole('button')[0];
  fireEvent.click(accountMenuAvatar);
};

const menuLinkClick = (btnId: number) => {
  const link = screen.getAllByRole('link')[btnId]
    .firstElementChild as HTMLElement;
  fireEvent.click(link);
};

describe('should render AccountMenu component', () => {
  beforeEach(() => {
    const mockCurrentUserInitialState: IUserState = MOCKED_STORE.currentUser;
    const mockCurrentUser = createSlice({
      name: 'mockCurrentUser',
      initialState: mockCurrentUserInitialState,
      reducers: {},
    });

    const mockAuthoritiesInitialState: IAuthority = MOCKED_STORE.authorities;
    const mockAuthorities = createSlice({
      name: 'mockAuthorities',
      initialState: mockAuthoritiesInitialState,
      reducers: {},
    });

    const mockStore = configureStore({
      reducer: combineReducers({
        currentUser: mockCurrentUser.reducer,
        authorities: mockAuthorities.reducer,
      }),
    });

    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <AuthContext.Provider value={AuthContextMock}>
            <AccountMenu />
          </AuthContext.Provider>
        </MemoryRouter>
      </Provider>,
    );
  });

  it('should render AccountMenu avatar', () => {
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should show account menu by clicking on an avatar icon', () => {
    openAccounMenu();
    expect(screen.getByText('Особистий кабінет')).toBeVisible();
  });

  it("should log out from current user profile by clicking on the button 'Вийти'", () => {
    openAccounMenu();
    menuLinkClick(1);
    expect(AuthContextMock.removeAuthorization).toHaveBeenCalled();
  });

  it('should hide account menu by clicking on menu link', () => {
    openAccounMenu();
    menuLinkClick(0);
    expect(screen.getByText('Особистий кабінет')).not.toBeVisible();
  });
});

describe('should not render AccountMenu component', () => {
  it("should not render current user's avatar and AccountMenu component is not available", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <AccountMenu />
        </MemoryRouter>
      </Provider>,
    );
    expect(screen.queryByRole('button')).toBeNull();
  });
});
