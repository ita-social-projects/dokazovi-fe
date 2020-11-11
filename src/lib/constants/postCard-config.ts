import {
  IPost,
  IExpert,
  DirectionEnum,
  PostStatus,
  PostTypeEnum,
} from '../types';
import IMAGE from '../images/1.png';

export const MOCK_DATA: IPost = {
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

export const MOCK_DATA_USER: IExpert = {
  firstName: 'Ivan',
  secondName: 'Pavlov',
  workPlace: 'Kyiv, KMKL #17',
  photo: IMAGE,
};
