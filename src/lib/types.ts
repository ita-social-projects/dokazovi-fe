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

export enum FilterTypeEnum {
  POST_TYPES = 'POST_TYPES',
  DIRECTIONS = 'DIRECTIONS',
  REGIONS = 'REGIONS',
  TAGS = 'TAGS',
}

export enum CourseEnum {
  STUDY = 'STUDY',
}

export enum CourseTypeEnum {
  COURSE = 'COURSE',
}
export interface ICourse {
  photo?: string;
  courseType: CourseTypeEnum;
  direction: CourseEnum;
  title: string;
  createdAt: string;
  course: boolean;
}

export enum FilterTypeEnum {
  POST_TYPES = 'POST_TYPES',
  DIRECTIONS = 'DIRECTIONS',
  REGIONS = 'REGIONS',
  TAGS = 'TAGS',
}

export interface IPost {
  id?: number;
  title: string;
  content?: string;
  author?: IExpert;
  mainDirection: IDirection;
  directions?: IDirection[];
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

export type ExpertRegionType = IPostDirection;

export interface IDirection {
  id?: number;
  color?: string;
  name: string;
  label?: string;
  route?: string;
}

export interface IInstitution {
  city: {
    id: number;
    name: string;
  };
  id: number;
  name: string;
}

export interface IFilter {
  value: any;
}
