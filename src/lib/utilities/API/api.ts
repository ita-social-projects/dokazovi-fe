import axios, { AxiosResponse } from 'axios';
import { BASE_URL } from './baseURL';
import {
  GetResponseType,
  GetTagResponseType,
  GetVersionType,
  ImportantPostResponseType,
  LatestPostResponseType,
  PostTagResponseType,
} from './types';

const instance = axios.create({
  baseURL: BASE_URL,
});

type GetPostConfigType = {
  params: {
    page?: number;
    size?: number;
    sort?: string[];
  };
};

type GetTagConfigType = {
  params: {
    value: string;
    limit?: number;
  };
};

type PostTagRequestBodyType = {
  tag: string;
};

type PostsTypeType = 'important' | 'latest';

export const getPosts = (
  postsType: PostsTypeType,
  config?: GetPostConfigType,
): Promise<
  AxiosResponse<
    GetResponseType<ImportantPostResponseType | LatestPostResponseType>
  >
> => {
  if (postsType === 'important') {
    return instance.get<GetResponseType<ImportantPostResponseType>>(
      `/post/${postsType}`,
      config,
    );
  }
  return instance.get<GetResponseType<LatestPostResponseType>>(
    `/post/${postsType}`,
    config,
  );
};

export const getExperts = () => {
  return instance.get(`/user/experts`);
};

export const postTag = (
  requestBody: PostTagRequestBodyType,
): Promise<AxiosResponse<PostTagResponseType>> => {
  return instance.post(`/tag`, requestBody);
};

export const getTag = (
  config: GetTagConfigType,
): Promise<AxiosResponse<GetTagResponseType>> => {
  return instance.get(`/tag/findByValue`, config);
};

export const getVersion = (): Promise<AxiosResponse<GetVersionType>> => {
  return instance.get(`/version`);
};
