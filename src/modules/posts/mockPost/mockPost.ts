export const mockPost = {
  id: 30,
  title: 'Tenth therapy post',
  content:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  author: {
    id: 10,
    firstName: 'Степан',
    lastName: 'Степанов',
    avatar: 'https://i.pravatar.cc/300?img=12',
    mainInstitution: {
      id: 5,
      name: 'Medical Idea',
      city: {
        id: 55,
        name: 'Бровари',
      },
    },
  },
  directions: [
    {
      id: 1,
      name: 'covid-19',
      label: 'Covid-19',
      color: '#ef5350',
    },
  ],
  postType: {
    id: 1,
    name: 'Стаття',
  },
  tags: [],
  type: {
    id: 1,
    name: 'Стаття',
  },
  createdAt: '15.12.2020',
  modifiedAt: '15.12.2020',
};
