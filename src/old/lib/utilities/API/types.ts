import { IDirection, IOrigin, IPost } from '../../types';

export type CreatePostRequestType = {
  title: string;
  authorsName?: string;
  authorsDetails?: string;
  content: string;
  directions: IDirection[];
  origins?: IOrigin[];
  preview: string;
  type: {
    id: number;
  };
  previewImageUrl?: string;
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
};

export type ActivePostType = {
  id: number;
  name: string;
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
};

export type ExpertsResponseType = GetResponseType<ExpertResponseType>;

export type PostsResponseType = GetResponseType<PostResponseType>;

export type NewestPostsResponseType = GetResponseType<NewestPostResponseType>;

export enum NewestTypeEnum {
  MEDIA,
  TRANSLATION,
  EXPERT_OPINION,
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

type GetConfigType = {
  params: RequestParamsType;
};

export type GetExpertsConfigType = GetConfigType & {
  params: {
    directions?: number[];
    regions?: number[];
  };
};

export type GetPostsConfigType = GetConfigType;

export type RequestParamsType = {
  page?: number;
  size?: number;
  sort?: string[];
  directions?: number[];
  direction?: number[];
  type?: number[];
  types?: number[];
  expert?: number;
  regions?: number[];
  tag?: number[];
  origins?: number[];
  userName?: string;
};
