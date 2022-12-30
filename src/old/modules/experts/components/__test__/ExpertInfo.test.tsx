import React from 'react';
import { screen, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { IExpert } from 'old/lib/types';
import ExpertInfo from '../ExpertInfo';

const EXPERT_INFO_MOCK: IExpert = {
  id: 1,
  firstName: 'John',
  lastName: 'Doe',
  avatar: 'avatar',
  phone: '+38(044)1111111',
  email: 'j.doe@gmail.com',
  bio: 'Lorem ipsum dolor sit amet',
  socialNetworks: ['facebook/link'],
};

const EXPERT_INFO_WITHOUT_CONTACTS_MOCK: IExpert = {
  id: 2,
  firstName: 'Linda',
  lastName: 'Doe',
  avatar: 'avatar',
  phone: '+38(044)7777777',
  bio: 'Lorem ipsum dolor sit amet consectur',
  socialNetworks: [],
};

describe('ExpertsInfo component renders with all props', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <ExpertInfo expert={EXPERT_INFO_MOCK} />
      </MemoryRouter>,
    );
  });

  it('ExpertsInfo component renders full name', () => {
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  it('ExpertsInfo avatar renders', () => {
    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  it('ExpertsInfo bio renders', () => {
    expect(screen.getByText('Lorem ipsum dolor sit amet')).toBeInTheDocument();
  });

  it("Expert's contact info renders", () => {
    expect(screen.getByText('j.doe@gmail.com')).toBeInTheDocument();
    expect(screen.getByText('facebook/link')).toBeInTheDocument();
  });
});

describe('Render ExpertInfo component without contact information', () => {
  it('Render ExpertInfo without contact information', () => {
    render(
      <MemoryRouter>
        <ExpertInfo expert={EXPERT_INFO_WITHOUT_CONTACTS_MOCK} />
      </MemoryRouter>,
    );
    expect(screen.queryByText('j.doe@gmail.com')).toBeNull();
  });
});
