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
  ARTICLE = 1,
  DOPYS = 2,
  VIDEO = 3,
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
  content: string;
  author: {
    avatar?: string;
    firstName: string;
    id: number;
    lastName: string;
    mainInstitution: {
      city: {
        id: number;
        name: string;
      };
      id: number;
      name: string;
    };
  };
  directions: IDirection[];
  tags?: IPostTag[];
  type: IPostType;
  createdAt: string;
  modifiedAt?: string;
  preview: string;
  videoUrl?: string;
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

export interface IAuthInputs {
  email: string;
  password: string;
}
