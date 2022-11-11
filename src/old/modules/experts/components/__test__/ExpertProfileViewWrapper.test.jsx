/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { combineReducers, configureStore, createSlice } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import {
  mockExpertMaterials,
  mockProperties,
  mockMaterials,
} from './mocks/expertProfileWrapper';
import ExpertProfileViewWrapper from '../ExpertProfileViewWrapper';
import { getExpertById } from '../../../../lib/utilities/API/api';
import { ThemeProvider } from '@material-ui/core';
import { MAIN_THEME } from '../../../../../styles/theme';

const mockedStore = {
  expertMaterials: mockExpertMaterials,
  properties: mockProperties,
  materials: mockMaterials,
};

const mockExpertMaterialsSlice = createSlice({
  name: 'mockExpertMaterials',
  initialState: mockExpertMaterials,
  reducers: {},
});

const mockPropertiesSlice = createSlice({
  name: 'mockExpertMaterials',
  initialState: mockProperties,
  reducers: {},
});

const mockMaterialsSlice = createSlice({
  name: 'mockExpertMaterials',
  initialState: mockMaterials,
  reducers: {},
});

const mockStr = configureStore({
  reducer: combineReducers({
    expertMaterials: mockExpertMaterialsSlice.reducer,
    properties: mockPropertiesSlice.reducer,
    materials: mockMaterialsSlice.reducer,
  }),
});

jest.mock('../../../../../models/store', () => ({
  store: {
    getState: () => mockedStore,
  },
}));

jest.mock('../../../../lib/utilities/API/api', () => ({
  getExpertById: jest.fn(),

  getActivePostTypes: () =>
    Promise.resolve({
      data: [{ id: 1, name: 'Стаття' }],
    }),
  getActiveDirections: () =>
    Promise.resolve({
      data: [
        {
          id: 3,
          name: 'surgery',
          label: 'Хірургія',
          color: '#7aebbf',
          hasDoctors: true,
          hasPosts: true,
        },
      ],
    }),
}));

jest.mock('react-ga');

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
  useParams: () => ({ expertId: '10' }),
  useLocation: () => ({
    pathname: '/test',
  }),
}));

describe('ExpertProfileViewWrapper component tests', () => {
  it('should render ExpertProfileViewWrapper component', async () => {
    const { asFragment } = render(
      <Provider store={mockStr}>
        <MemoryRouter>
          <ExpertProfileViewWrapper />
        </MemoryRouter>
      </Provider>,
    );

    await waitFor(() => expect(asFragment()).toMatchSnapshot());
  });

  it('should render expert profile', async () => {
    getExpertById.mockImplementation(() =>
      Promise.resolve({
        data: {
          id: 10,
          firstName: 'Марія',
          lastName: 'Марієнко',
          bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
          qualification: 'Лікар вищої категорії',
          phone: '+380956456969',
          email: 'masha@mail.com',
          socialNetworks: ['facebook/link'],
        },
      }),
    );

    render(
      <ThemeProvider theme={MAIN_THEME}>
        <Provider store={mockStr}>
          <MemoryRouter>
            <ExpertProfileViewWrapper />
          </MemoryRouter>
        </Provider>
      </ThemeProvider>,
    );

    await waitFor(() =>
      expect(screen.getByTestId('expert-info')).toBeInTheDocument(),
    );
  });

  it('should render error 404', async () => {
    getExpertById.mockImplementation(() => Promise.reject());

    render(
      <Provider store={mockStr}>
        <MemoryRouter>
          <ExpertProfileViewWrapper />
        </MemoryRouter>
      </Provider>,
    );

    await waitFor(() =>
      expect(mockHistoryPush).toHaveBeenCalledWith(`/error_404`),
    );
  });
});
