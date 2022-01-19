import React from 'react';
import { render, screen } from '@testing-library/react';
// import { MemoryRouter } from 'react-router-dom';
import { ExpertsViewCard } from '../ExpertsViewCard';
import { IExpert, LoadingStatusEnum } from '../../../types';

const MOCK_EXPERTS_LIST: IExpert[] = [
  {
    id: 10,
    firstName: 'Марія',
    lastName: 'Марієнко',
    email: 'masha@mail.com',
    qualification: 'Лікар вищої категорії',
    phone: '+380956456969',
    avatar: 'https://i.pravatar.cc/300?img=16',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    socialNetwork: 'https://www.youtube.com',
    directions: [
      {
        id: 6,
        name: 'cardiology',
        label: 'Кардіологія',
        color: '#00ffff',
        hasDoctors: true,
        hasPosts: true,
      },
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
      id: 5,
      city: {
        id: 55,
        name: 'Бровари',
      },
      name: 'Medical Idea',
    },
    lastAddedPost: {
      id: 266,
      title: 'Офтальмонологія',
    },
  },
  {
    id: 6,
    firstName: 'Палана',
    lastName: 'Литвинова',
    email: 'PalanaLitvinova514@mail.com',
    qualification: 'Кандидат медичних наук',
    phone: '+380633484351',
    avatar: 'https://i.pravatar.cc/300?img=44',
    bio:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ',
    socialNetwork: 'https://www.youtube.com',
    directions: [
      {
        id: 6,
        name: 'cardiology',
        label: 'Кардіологія',
        color: '#00ffff',
        hasDoctors: true,
        hasPosts: true,
      },
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
  },
  {
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
  },
  {
    id: 16,
    firstName: 'Олег',
    lastName: 'Петренко',
    email: 'petrenko@mail.com',
    qualification: 'Лікар вищої категорії',
    phone: '+380957773377',
    avatar: 'https://i.pravatar.cc/300?img=16',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    socialNetwork: 'https://www.youtube.com',
    directions: [
      {
        id: 6,
        name: 'cardiology',
        label: 'Кардіологія',
        color: '#00ffff',
        hasDoctors: true,
        hasPosts: true,
      },
    ],
    mainInstitution: {
      id: 5,
      city: {
        id: 55,
        name: 'Бровари',
      },
      name: 'Medical Idea',
    },
    lastAddedPost: {
      id: 266,
      title: 'Офтальмонологія',
    },
  },
];

const EMPTY_EXPERTS_LIST_MOCK = [];

describe('ExpertsViewCard test', () => {
  it('should render component and match snapshot', () => {
    const { asFragment } = render(
      <ExpertsViewCard
        cards={MOCK_EXPERTS_LIST}
        loading={LoadingStatusEnum.succeeded}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it('should render component while loading', () => {
    render(
      <ExpertsViewCard
        cards={MOCK_EXPERTS_LIST}
        loading={LoadingStatusEnum.pending}
      />,
    );
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });
  it('should render cards', () => {
    render(
      <ExpertsViewCard
        cards={MOCK_EXPERTS_LIST}
        loading={LoadingStatusEnum.succeeded}
      />,
    );
    expect(screen.getAllByAltText('doctor')).toHaveLength(4);
  });
  it('should render error message when loading is failed', () => {
    const { asFragment } = render(
      <ExpertsViewCard
        cards={EMPTY_EXPERTS_LIST_MOCK}
        loading={LoadingStatusEnum.failed}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
