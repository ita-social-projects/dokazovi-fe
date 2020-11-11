import {
  IPost,
  DirectionEnum,
  PostStatus,
  ExpertStatus,
  PostTypeEnum,
} from '../types';
import IMAGE from '../images/1.png';

export const MOCK_DATA: IPost = {
  author: {
    status: ExpertStatus.NEW,
    firstName: 'Ivan',
    secondName: 'Pavlov',
    email: 'pavlov_ivan@gmail.com',
    phone: '+30960535353',
    photo: IMAGE,
    workPlace: 'Kyiv, KMKL #17',
  },
  direction: DirectionEnum.COVID19,
  title: 'Mock title',
  content: 'Lorem ipsum lorem ipsum',
  status: PostStatus.PUBLISHED,
  important: true,
  tags: ['covid19'],
  createdAt: new Date(),
  modifiedAt: new Date(),
  postType: PostTypeEnum.ARTICLE,
  preview: 'Lorem ipsum',
};
