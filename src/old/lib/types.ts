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
  PLANNED = 'PLANNED',
  NEEDS_EDITING = 'NEEDS_EDITING',
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
  POST_BY_STATUS,
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

export enum filtersStateEnum {
  empty = 'empty',
  notEmpty = 'not empty',
}

export type LoadingStatusType =
  | LoadingStatusEnum.idle
  | LoadingStatusEnum.pending
  | LoadingStatusEnum.succeeded
  | LoadingStatusEnum.failed;

export enum LocalStorageKeys {
  ACCESS_TOKEN = 'ACCESS_TOKEN',
  PERMISSIONS = 'PERMISSIONS',
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
  STATUSES = 'statuses',
}

export interface IPost {
  id: number;
  title: string;
  content: string;
  realViews?: number;
  views?: number;
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
  postStatus?: number;
  preview: string;
  previewImageUrl?: string;
  importantImageUrl?: string;
  importantMobileImageUrl?: string;
  videoUrl?: string;
  status?: string;
}

export interface IExpert {
  id: number;
  firstName: string;
  lastName: string;
  avatar?: string;
  qualification?: string;
  phone?: string;
  email?: string;
  region: {
    id: number;
    name: string;
    usersPresent: boolean;
  };
  city?: string;
  bio: string;
  mainInstitution: IInstitution;
  mainDirection?: IDirection;
  directions?: IDirection[];
  lastAddedPost?: {
    id: number;
    title: string;
  };
  socialNetworks: string[];
  isAllowedToDelete?: boolean;
  postStatuses?: PostStatusType[];
  createdAt: string;
  editedAt?: string;
}

export type PostStatusType = {
  id: number;
  status: string;
};

export interface IPostTag {
  id: number;
  tag: string;
}

export interface IPostType {
  id: number;
  name: string;
}

export interface IPostStatus {
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

export interface ICity {
  id: number;
  name: string;
  regionId: number;
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

export type ProfileMenuType = 'info' | 'materials' | 'passwordChange' | 'mail';

export interface IProfileMenuOption {
  label: string;
  value: ProfileMenuType;
}

export interface IFooterStyleProps {
  isAdminPage: boolean;
  isProfilePage: boolean;
}

export type AdminMenuType = 'authors' | 'important' | 'materials';

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

export enum ConditionsContentSectionEnum {
  ABOUT = 1,
  RULES = 2,
  CONTACTS = 3,
}

export type ConditionsContentSectionType =
  | ConditionsContentSectionEnum.ABOUT
  | ConditionsContentSectionEnum.RULES
  | ConditionsContentSectionEnum.CONTACTS;

export enum PostStatusForApi {
  'Чернетка' = 0,
  'Потребує модерації' = 1,
  'Не переглянутий' = 2,
  'На модерації' = 3,
  'Заплановано' = 4,
  'Опубліковано' = 5,
  'Архівований' = 6,
}
