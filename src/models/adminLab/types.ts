import {
  IPost,
  LoadingStatusEnum,
  QueryTypeEnum,
  IExpert,
} from '../../old/lib/types';

export interface IAdminPost extends IPost {
  // modifiedViewsCounter?: number;
  status: string;
}

export enum FieldEnum {
  AUTHOR = 'author',
  TITLE = 'title',
}

export interface IAdminLab {
  data: IAdminLabData;
  meta: IAdminLabMeta;
  loading: LoadingStatusEnum;
  modifications: IAdminLabModifications;
  error: string | null;
}

export interface IAdminLabMeta {
  sort: ISort;
  filters: {
    [key in QueryTypeEnum]?: number[];
  };
  page: number;
  size: number;
  textFields: {
    [key in FieldEnum]: string;
  };
  date: IDate;
}

export interface IAdminLabModifications {
  fakeViews: number;
  newPostPublicationDate: string;
}

interface IDate {
  start: string | undefined;
  end: string | undefined;
}

export interface IFilter {
  filter: string;
  options: number[];
}

export interface IField {
  field: string;
  text: string;
}

export interface ISort {
  order: keyof typeof Order;
  sortBy: keyof typeof SortBy;
}

export interface IAdminLabData {
  totalPages: number;
  postIds: number[];
  posts: IPostsOBJ;
}

export interface IPostsOBJ {
  [id: string]: IAdminPost;
}

export interface IMyKnownError {
  errorMessage: string;
}

export enum SortBy {
  published_at = 'published_at',
  post_id = 'post_id',
  type_id = 'title',
  title = 'title',
  content = 'content',
  status = 'status',
  important = 'important',
  created_at = 'created_at',
  modified_at = 'modified_at',
  first_name = 'u.first_name',
  real_views = 'real_views',
  views = 'views',
}

export enum Order {
  desc = 'desc',
  asc = 'asc',
}

export interface IDateManipulation {
  date: string | undefined;
  option: 'end' | 'start';
}

export enum StatusesForActions {
  DRAFT,
  NEEDS_EDITING,
  MODERATION_FIRST_SIGN,
  MODERATION_SECOND_SIGN,
  PLANNED,
  PUBLISHED,
  ARCHIVED,
}

export interface IAdminLabExpert extends IExpert {
  createdAt?: string;
  editedAt?: string;
}

export interface IAdminExpertsList {
  authors: {
    [id: string]: IAdminLabExpert;
  };
}
