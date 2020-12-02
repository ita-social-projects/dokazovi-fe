import { DirectionEnum, PostTypeEnum, IPost } from '../../types';

export const MOCK_DATA: IPost = {
  author: {
    id: '1',
    firstName: 'Микола',
    lastName: 'Амосов',
    workPlace: 'Київ',
    avatar:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS4FrYZFgHV0yy2J--h8TeyhRA8BN0QM7M7jA&usqp=CAU',
    phone: '+3809911111111',
  },
  direction: DirectionEnum.THERAPY,
  title: 'Назва статті',
  content:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  tags: ['therapy'],
  createdAt: '27.11.2020',
  postType: PostTypeEnum.ARTICLE,
  preview:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
};
