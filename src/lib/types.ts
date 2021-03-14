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
  idle = 'idle',
  pending = 'pending',
  succeeded = 'succeeded',
  failed = 'failed',
}

export enum LocalStorageKeys {
  ACCESS_TOKEN = 'ACCESS_TOKEN',
}

export enum FilterTypeEnum {
  POST_TYPES,
  DIRECTIONS,
  REGIONS,
  TAGS,
}

export enum QueryTypeEnum {
  POST_TYPES = 'types',
  DIRECTIONS = 'directions',
  REGIONS = 'regions',
  TAGS = 'tags',
  PAGE = 'page',
}

export interface IPost {
  id: number;
  title: string;
  content?: string;
  author: IExpert;
  directions?: IDirection[];
  tags?: IPostTag[];
  postType: IPostType;
  createdAt: string;
  modifiedAt?: string;
  preview?: string;
}

export interface IExpert {
  id: number;
  firstName: string;
  lastName: string;
  avatar?: string;
  qualification?: string;
  phone?: string;
  email?: string;
  bio?: string;
  mainInstitution?: IInstitution;
  mainDirection?: IDirection;
  directions?: IDirection[];
  lastAddedPost?: {
    id: number;
    title: string;
  };
}

export interface IPostTag {
  id: number;
  tag: string;
}

export interface IPostType {
  id: number;
  name: string;
}

export interface IDirection {
  id: number;
  color?: string;
  name: string;
  label?: string;
}

export interface IRegion {
  id: number;
  name: string;
}

export type DirectionIDType = Pick<IDirection, 'id'>;

export interface IInstitution {
  city: {
    id: number;
    name: string;
  };
  id: number;
  name: string;
}

export interface ICheckboxes {
  [key: string]: boolean;
}

export interface IInputs {
  email: string;
  password: string;
}
