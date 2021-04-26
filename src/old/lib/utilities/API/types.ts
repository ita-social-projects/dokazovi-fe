import { IDirection } from '../../types';

export type CreatePostRequestType = {
  title: string;
  content: string;
  directions: IDirection[];
  preview: string;
  type: {
    id: number;
  };
  previewImageUrl?: string;
  videoUrl?: string;
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
  directions: DirectionResponseType[];
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
  type?: number[];
  expert?: number;
  regions?: number[];
  tag?: number[];
};
