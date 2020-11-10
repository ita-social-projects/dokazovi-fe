import { IPost, DirectionEnum, PostStatus, PostTypeEnum } from '../types';

export const mockData: IPost = {
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
