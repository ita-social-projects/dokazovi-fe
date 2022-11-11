import React from 'react';
import { screen, render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import { IExpert } from 'old/lib/types';
import { store } from '../../../../../models/store';
import ExpertProfileView from '../ExpertProfileView';

const history = createMemoryHistory();

const TEST_DATA: IExpert = {
  id: 1,
  firstName: 'John',
  lastName: 'Doe',
  avatar: 'avatar',
  qualification: 'ophtalmology',
  phone: '+38(044)7777777',
  email: 'j.doe@gmail.com',
  bio: 'Lorem ipsum dolor sit amet consectur',
  socialNetworks: ['www.facebook.com'],
};

describe('ExpertsProfileView component renders correctly', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <ExpertProfileView expert={TEST_DATA} />
        </Router>
      </Provider>,
    );
  });

  it('Expert full name renders', () => {
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  it('Expert avatar renders', () => {
    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  it('Expert bio renders', () => {
    expect(
      screen.getByText('Lorem ipsum dolor sit amet consectur'),
    ).toBeInTheDocument();
  });
});
