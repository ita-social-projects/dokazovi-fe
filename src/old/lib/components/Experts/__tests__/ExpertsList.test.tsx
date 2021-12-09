import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ExpertsList } from '../ExpertsList';
import { IExpert } from '../../../types';

const MOCK_EMPTY_EXPERTS_LIST: IExpert[] = [];

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
      title: 'Офтальмологія',
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
    id: 1,
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
      title: 'Офтальмологія',
    },
  },
  {
    id: 2,
    firstName: 'Милетий',
    lastName: 'Чернышов',
    email: 'MiletiyChernyshov229@mail.com',
    qualification: 'Лікар вищої категорії',
    phone: '+380956687969',
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
      title: 'Офтальмологія',
    },
  },
  {
    id: 5,
    firstName: 'Гигран',
    lastName: 'Алексеев',
    email: 'GigranAlekseev32@mail.com',
    qualification: 'Кандидат медичних наук',
    phone: '+380633484351',
    avatar: 'https://i.pravatar.cc/300?img=44',
    bio:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ',
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
    id: 13,
    firstName: 'Марина',
    lastName: 'Вовк',
    email: 'maryna@mail.com',
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
    id: 7,
    firstName: 'Регіна',
    lastName: 'Регіненко',
    email: 'regina@mail.com',
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
      title: 'Офтальмологія',
    },
  },
  {
    id: 12,
    firstName: 'Степан',
    lastName: 'Степанов',
    email: 'stepan@mail.com',
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
      title: 'Офтальмологія',
    },
  },
  {
    id: 3,
    firstName: 'Незда',
    lastName: 'Ушаков',
    email: 'NezdaUshakov899@mail.com',
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
    id: 4,
    firstName: 'Кукури',
    lastName: 'Чапко',
    email: 'KukuriChapko624@mail.com',
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
    id: 14,
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
      title: 'Офтальмологія',
    },
  },
  {
    id: 8,
    firstName: 'Тарас',
    lastName: 'Шевченко',
    email: 'taras@mail.com',
    qualification: 'Лікар-спеціаліст',
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
        name: 'Вінниця',
      },
      name: 'Інномед',
    },
    lastAddedPost: {
      id: 246,
      title: 'Sit amet consectetur',
    },
  },
];

describe('ExpertsList test', () => {
  it('should render component and match snapshot', () => {
    const { asFragment } = render(
      <MemoryRouter>
        <ExpertsList experts={MOCK_EXPERTS_LIST} />
      </MemoryRouter>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('ExpertsList without data test', () => {
  it('should render error screen and match snapshot', () => {
    const { asFragment } = render(
      <MemoryRouter>
        <ExpertsList experts={MOCK_EMPTY_EXPERTS_LIST} />
      </MemoryRouter>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it('should render error message when no experts to show', () => {
    render(
      <MemoryRouter>
        <ExpertsList experts={MOCK_EMPTY_EXPERTS_LIST} />
      </MemoryRouter>,
    );
    expect(
      screen.getByText(
        'На жаль, даних, що відповідають вашому запиту, не знайдено.',
      ),
    ).toBeInTheDocument();
  });
});
