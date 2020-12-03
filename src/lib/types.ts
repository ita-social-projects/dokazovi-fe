export enum ExpertStatus {
  NEW = 'NEW',
  ACTIVE = 'ACTIVE',
  DELETED = 'DELETED',
}
export enum PostStatus {
  DRAFT = 'DRAFT',
  MODERATION_FIRST_SIGN = 'MODERATION_FIRST_SIGN',
  MODERATION_SECOND_SIGN = 'MODERATION_SECOND_SIGN',
  PUBLISHED = 'PUBLISHED',
  ARCHIVED = 'ARCHIVED',
}

export enum PostTypeEnum {
  ARTICLE = 'ARTICLE',
  DOPYS = 'DOPYS',
  VIDEO = 'VIDEO',
}

export enum LoadingStatusEnum {
  iddle = 'idle',
  pending = 'pending',
  succeeded = 'succeeded',
  failed = 'failed',
}

export interface IPost {
  id?: number;
  title: string;
  content?: string;
  author?: IExpert;
  mainDirection: IDirection;
  directions?: IPostDirection[];
  tags?: IPostTag[];
  postType: IPostType;
  createdAt: string;
  modifiedAt?: string;
  preview?: string;
}

export interface IExpert {
  id?: number;
  firstName: string;
  lastName: string;
  avatar?: string;
  mainInstitution?: {
    city: {
      id: number;
      name: string;
    };
    id: number;
    name: string;
  };
  mainDirection?: IDirection;
  lastAddedPost?: {
    id: number;
    title: string;
  };
  qualification?: string;
}

export interface IPostDirection {
  id: number;
  name: string;
}

export interface IPostTag {
  id: number;
  tag: string;
}

export interface IPostType {
  name: string;
}

export interface IDirection {
  id?: number;
  color: string;
  name: string;
  route?: string;
}

export interface ICourse {}
