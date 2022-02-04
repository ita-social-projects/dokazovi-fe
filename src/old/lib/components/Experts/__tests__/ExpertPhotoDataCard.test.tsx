import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ExpertPhotoDataCard from '../ExpertPhotoDataCard';
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

describe('ExpertPhotoDataCard test', () => {
  it('should render component and match snapshot', () => {
    const { asFragment } = render(
      <MemoryRouter>
        <ExpertPhotoDataCard expert={MOCK_DATA} />
      </MemoryRouter>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it("should render Expert's image", () => {
    render(
      <MemoryRouter>
        <ExpertPhotoDataCard expert={MOCK_DATA} />
      </MemoryRouter>,
    );
    expect(screen.getByAltText('doctor')).toBeInTheDocument();
  });
});
