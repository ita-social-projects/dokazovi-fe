import { IExpert } from '../../lib/types';

const experts: IExpert[] = [
  {
    id: 2,
    firstName: 'Андрій',
    lastName: 'Петров',
    email: 'andrii@mail.com',
    qualification: 'Лікар-спеціаліст',
    phone: '+380505050505',
    avatar:
      'https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png',
    bio:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    mainDirection: {
      id: 5,
      name: 'Вірусологія',
      color: '#da80e8',
    },
    directions: [
      {
        id: 5,
        name: 'Вірусологія',
        color: '#da80e8',
      },
      {
        id: 1,
        name: 'COVID-19',
        color: '#ef5350',
      },
      {
        id: 4,
        name: 'Терапія',
        color: '#ffee58',
      },
    ],
    mainInstitution: {
      id: 1,
      city: {
        id: 190,
        name: 'Київ',
      },
      name: 'Адоніс',
    },
    lastAddedPost: {
      id: 1,
      title: 'Fermentum iaculis',
    },
  },
  {
    id: 4,
    firstName: 'Дмитро',
    lastName: 'Степаненко',
    email: 'dmytro@mail.com',
    qualification: 'Лікар-спеціаліст',
    phone: '+380444444444',
    avatar:
      'https://www.publicdomainpictures.net/pictures/270000/velka/avatar-people-person-business-u.jpg',
    bio:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    mainDirection: {
      id: 4,
      name: 'Терапія',
      color: '#ffee58',
    },
    directions: [
      {
        id: 5,
        name: 'Вірусологія',
        color: '#da80e8',
      },
      {
        id: 4,
        name: 'Терапія',
        color: '#ffee58',
      },
      {
        id: 3,
        name: 'Хірургія',
        color: '#7aebbf',
      },
    ],
    mainInstitution: {
      id: 1,
      city: {
        id: 190,
        name: 'Київ',
      },
      name: 'Адоніс',
    },
    lastAddedPost: {
      id: 14,
      title: 'Fermentum iaculis',
    },
  },
];

export default experts;
