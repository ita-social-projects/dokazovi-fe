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

export enum OriginTypeEnum {
  EXPERT_OPINION = 1,
  TRANSLATION = 2,
  MEDIA = 3,
}

export type OriginType =
  | OriginTypeEnum.EXPERT_OPINION
  | OriginTypeEnum.MEDIA
  | OriginTypeEnum.TRANSLATION;

export enum PostTypeEnum {
  ARTICLE = 1,
  DOPYS = 3,
  VIDEO = 2,
}

export enum LoadMoreButtonTextType {
  EXPERT,
  POST,
}

export enum PostsPreviewCardStylesEnum {
  VIDEO = 'VIDEO',
  MEDIA = 'MEDIA',
  TRANSLATION = 'TRANSLATION',
  EXPERT_OPINION = 'EXPERT_OPINION',
  IMPORTANT = 'IMPORTANT',
}

export type PostsPreviewCardStylesType =
  | PostsPreviewCardStylesEnum.VIDEO
  | PostsPreviewCardStylesEnum.MEDIA
  | PostsPreviewCardStylesEnum.TRANSLATION
  | PostsPreviewCardStylesEnum.EXPERT_OPINION
  | PostsPreviewCardStylesEnum.IMPORTANT;

export enum LoadingStatusEnum {
  idle = 'idle',
  pending = 'pending',
  succeeded = 'succeeded',
  failed = 'failed',
}

export type LoadingStatusType =
  | LoadingStatusEnum.idle
  | LoadingStatusEnum.pending
  | LoadingStatusEnum.succeeded
  | LoadingStatusEnum.failed;

export enum LocalStorageKeys {
  ACCESS_TOKEN = 'ACCESS_TOKEN',
}

export enum FilterTypeEnum {
  POST_TYPES,
  DIRECTIONS,
  REGIONS,
  TAGS,
  ORIGINS,
}

export enum ChipFilterEnum {
  REGION = 'REGION',
  DIRECTION = 'DIRECTION',
  ORIGIN = 'ORIGIN',
  POST_TYPE = 'POST_TYPE',
}

export type ChipFilterType =
  | ChipFilterEnum.REGION
  | ChipFilterEnum.DIRECTION
  | ChipFilterEnum.ORIGIN
  | ChipFilterEnum.POST_TYPE;

export enum QueryTypeEnum {
  POST_TYPES = 'types',
  DIRECTIONS = 'directions',
  REGIONS = 'regions',
  TAGS = 'tags',
  PAGE = 'page',
  ORIGINS = 'origins',
}

export interface IPost {
  id: number;
  title: string;
  content: string;
  uniqueViewsCounter?: number;
  author: {
    avatar?: string;
    firstName: string;
    id: number;
    lastName: string;
    bio?: string;
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
  publishedAt: string;
  modifiedAt?: string;
  origins: IOrigin[];
  preview: string;
  previewImageUrl?: string;
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
  bio: string;
  mainInstitution?: IInstitution;
  mainDirection?: IDirection;
  directions?: IDirection[];
  lastAddedPost?: {
    id: number;
    title: string;
  };
  socialNetwork?: string;
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
  hasPosts?: boolean;
  hasDoctors?: boolean;
}

export interface IFilter {
  id: number;
  color?: string;
  name: string;
  label?: string;
}

export interface IOrigin {
  id: number;
  name: string;
  parameter: null | string | number;
}

export interface IRegion {
  id: number;
  name: string;
  usersPresent?: boolean;
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

export interface IFooterStyleProps {
  isAdminPage: boolean;
}

export type AdminMenuType = 'important';

export interface IAdminMenuOption {
  section: string;
  label: string;
  value: AdminMenuType;
}

export interface IFilterOption {
  label: string;
  value: number;
  chipValue: string;
}

export type AdminPageFiltersType =
  | QueryTypeEnum.ORIGINS
  | QueryTypeEnum.DIRECTIONS
  | QueryTypeEnum.POST_TYPES;

export type ViewModsType = 'selected' | 'preview';
