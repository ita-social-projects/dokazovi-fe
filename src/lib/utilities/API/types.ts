import { IDirection, IPostType, DirectionIDType } from '../../types';

export type PostPostRequestType = {
  content: string;
  directions: DirectionIDType[];
  preview: string;
  title?: string;
  type: {
    id: number;
  };
};

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
  postType: IPostType;
  createdAt: string;
  directions: IDirection[];
  id: number;
  title: string;
  type: {
    id: number;
    name: string;
  };
};

export type GetResponseType<T> = {
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

export type PostTagResponseType = {
  id: number;
  tag: string;
};

export type GetTagResponseType = PostTagResponseType[];

export type GetVersionType = {
  version: string;
};

export type PostPostResponseType = {
  id: number;
  name: string;
};

export type DirectionType = {
  id: number;
  name: string;
  label: string;
  color: string;
};

export type GetDirectionType = DirectionType[];

export type GetPostResponseType = PostPostResponseType[];

export type GetRegionsType = {
  id: number;
  name: string;
};
export type PostLoginResponseType = {
  accessToken: string;
  tokenType: string;
};
