import { IDirection, IOrigin, IPost, PostStatusType } from '../../types';

export type CreatePostRequestType = {
  title: string;
  authorsName?: string;
  authorsDetails?: string;
  content: string;
  directions: IDirection[];
  origins?: IOrigin[];
  postStatus?: number;
  preview: string;
  type: {
    id: number;
  };
  previewImageUrl?: string;
  importantImageUrl?: string;
  importantMobileImageUrl?: string;
  videoUrl?: string;
  authorId?: number | null;
};

export type CreateTextPostRequestType = CreatePostRequestType;

export type CreateVideoPostRequestType = CreatePostRequestType & {
  videoUrl: string;
};

export type CreatePostRequestUnionType =
  | CreateTextPostRequestType
  | CreateVideoPostRequestType;

type UpdatePostRequestType = CreatePostRequestType & {
  id: number;
  postStatus?: number;
  newPostDate?: string;
};

export type UpdateTextPostRequestType = UpdatePostRequestType;

export type UpdateVideoPostRequestType = UpdatePostRequestType & {
  videoUrl: string;
};

export type UpdatePostRequestUnionType =
  | UpdateTextPostRequestType
  | UpdateVideoPostRequestType;

export type PostResponseType = {
  author: {
    avatar: string;
    firstName: string;
    id: number;
    lastName: string;
    bio: string;
    mainInstitution: {
      city: {
        id: number;
        name: string;
      };
      id: number;
      name: string;
    };
  };
  content: string;
  preview: string;
  postType: PostTypeResponseType;
  createdAt: string;
  publishedAt: string;
  directions: DirectionResponseType[];
  origins: IOrigin[];
  id: number;
  title: string;
  type: {
    id: number;
    name: string;
  };
  videoUrl?: string;
  status: string;
};

export type ExpertResponseType = {
  avatar: string;
  bio: string;
  firstName: string;
  id: number;
  lastAddedPost: {
    id: number;
    title: string;
  };
  lastName: string;
  mainDirection: {
    id: number;
    name: string;
  };
  mainInstitution: {
    city: {
      id: number;
      name: string;
    };
    id: number;
    name: string;
  };
  qualification: string;
  region: {
    id: number;
    name: string;
    usersPresent: boolean;
  };
  city?: string;
  email?: string;
  socialNetworks: string[];
  postStatuses: PostStatusType[];
  createdAt: string;
  editedAt?: string;
};

export type ActivePostType = {
  id: number;
  name: string;
};

export type ActiveDirectionType = {
  id: number;
  name: string;
  label?: string;
  color?: string;
  hasPosts?: boolean;
  hasDoctors?: boolean;
};

export type CreateTagRequestType = {
  tag: string;
};

export type TagResponseType = {
  id: number;
  tag: string;
};

export type VersionResponseType = {
  version: string;
};

export type DirectionResponseType = {
  id: number;
  name: string;
  label: string;
  color: string;
};

export type OriginResponseType = {
  id: number;
  name: string;
  parameter: null;
};

export type RegionResponseType = {
  id: number;
  name: string;
  userPresent?: boolean;
};

export type CityResponseType = {
  id: number;
  name: string;
  regionId: number;
};

export type PostTypeResponseType = {
  id: number;
  name: string;
};

export type LoginResponseType = {
  accessToken: string;
  tokenType: string;
};

type GetResponseType<T> = {
  content: T[];
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  size: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  totalElements: number;
  totalPages: number;
  message?: string;
  success?: boolean;
};

export type ExpertsResponseType = GetResponseType<ExpertResponseType>;

export type PostsResponseType = GetResponseType<PostResponseType>;

export type NewestPostsResponseType = GetResponseType<NewestPostResponseType>;

export enum NewestTypeEnum {
  EXPERT_OPINION,
  MEDIA,
  TRANSLATION,
  VIDEO,
}

export type NewestPostResponseType = {
  fieldName: string;
  postDTOS: IPost[];
};

export type GetTagsConfigType = {
  params: {
    value: string;
    limit?: number;
  };
};

export type GetConfigType = {
  params: RequestParamsType;
};

export type GetExpertsConfigType = GetConfigType & {
  params: {
    directions?: number[];
    regions?: number[];
  };
};

export type GetPostsConfigType = GetConfigType & {
  params: {
    statuses?: number[];
  };
};

export type GetPostsAdminConfigType = GetConfigType & {
  params: {
    statuses: number[];
    author: string;
    title: string;
    startDate?: string;
    endDate?: string;
  };
};

export type RequestParamsType = {
  page?: number;
  size?: number;
  sort?: string[] | string;
  directions?: number[];
  direction?: number[];
  type?: number[];
  types?: number[] | string | null;
  expert?: number;
  regions?: number[];
  tag?: number[];
  origins?: number[];
  userName?: string;
  posts?: string;
  status?: string;
};

export type GetFilteredPostsType = {
  size: number;
  page: number;
  expert: number;
  types?: string;
  status: string;
  sort?: string[];
};

export type PlatformInformationType = {
  id: number;
  title: string;
  text: string;
};

export type UpdatePlatformInformationRequestType = {
  id: number;
  title?: string;
  text?: string;
};

export type ChangeLogType = {
  empty?: boolean;
  first?: boolean;
  last?: boolean;
  number?: number;
  numberOfElements?: number;
  size?: number;
  totalElements?: number;
  totalPages?: number;
  content: [];
};

export type GetChangeLogType = ChangeLogType & {
  changes?: string;
  dateOfChange?: {
    date: number;
    day: number;
    hours: number;
    minutes: number;
    month: number;
    nanos: number;
    seconds: number;
    time: number;
    timezoneOffset: number;
    year: number;
  };
  id?: number;
  nameOfChanger?: string;
  title?: string;
  totalPages: number;
};
