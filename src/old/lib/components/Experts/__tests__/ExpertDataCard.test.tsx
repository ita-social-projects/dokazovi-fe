import React from 'react';
import { render, screen } from '@testing-library/react';
import { ExpertDataCard } from '../ExpertDataCard';
import { IExpert } from '../../../types';

const MOCK_DATA: IExpert = {
  id: 6,
  firstName: 'Таржеман',
  lastName: 'Соколов',
  email: 't.sokolov@mail.com',
  qualification: 'Кандидат медичних наук',
  phone: '+380633335533',
  avatar: 'https://i.pravatar.cc/300?img=44',
  bio:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ',
  socialNetwork: 'https://www.youtube.com',
  directions: [
    {
      id: 4,
      name: 'therapy',
      label: 'Терапія',
      color: '#ffee58',
      hasDoctors: true,
      hasPosts: true,
    },
  ],
  mainInstitution: {
    id: 4,
    city: {
      id: 119,
      name: 'Дніпро',
    },
    name: 'Медікум',
  },
  lastAddedPost: {
    id: 246,
    title: 'Sit amet consectetur',
  },
};

const renderExpertDataCard = () =>
  render(<ExpertDataCard expert={MOCK_DATA} />);

describe('ExpertBlock test', () => {
  beforeEach(() => renderExpertDataCard());
  it('should render component and match snapshot', () => {
    const { asFragment } = render(<ExpertDataCard expert={MOCK_DATA} />);
    expect(asFragment()).toMatchSnapshot();
  });
  it("should render Expert's name", () => {
    expect(screen.getByText('Таржеман Соколов')).toBeInTheDocument();
  });
  it("should render Expert's qualification, name of mainInstitution and city", () => {
    expect(
      screen.getByText('Кандидат медичних наук, Медікум, Дніпро'),
    ).toBeInTheDocument();
  });
});
