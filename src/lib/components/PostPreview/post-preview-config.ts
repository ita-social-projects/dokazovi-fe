import { IPost } from '../../types';

export const MOCK_DATA: IPost = {
  author: {
    firstName: 'Микола',
    lastName: 'Амосов',
    mainInstitution: {
      city: {
        id: 1,
        name: 'Київ',
      },
      id: 1,
      name: 'Hospital #6',
    },
    avatar:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS4FrYZFgHV0yy2J--h8TeyhRA8BN0QM7M7jA&usqp=CAU',
  },
  mainDirection: {
    id: 4,
    color: '#ffee58',
    name: 'Терапія',
  },
  title: 'Назва статті',
  content:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  tags: [{ id: 5, tag: 'covid19' }],
  createdAt: '27.11.2020',
  postType: { name: 'Допис' },
  preview:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
};
