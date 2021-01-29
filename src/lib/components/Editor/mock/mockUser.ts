import { IPost } from '../../../types';

export const mockUser: IPost = {
  author: {
    id: 10,
    avatar: 'https://i.pravatar.cc/300?img=12',
    firstName: 'Степан',
    lastName: 'Степанов',
    mainInstitution: {
      id: 5,
      name: 'Medical Idea',
      city: { id: 55, name: 'Бровари' },
    },
  },
  createdAt: '27.11.2020',
  title: 'Ultrices eros in cursus',
  postType: {
    id: 1,
    name: 'Стаття',
  },
  preview: '',
  id: 101,

  directions: [
    { id: 1, name: 'covid-19', label: 'Covid-19', color: '#ef5350' },
    { id: 4, name: 'therapy', label: 'Терапія', color: '#ffee58' },
    { id: 3, name: 'surgery', label: 'Хірургія', color: '#7aebbf' },
  ],
};
