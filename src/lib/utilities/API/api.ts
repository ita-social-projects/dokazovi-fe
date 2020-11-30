import axios, { AxiosResponse } from 'axios';
import { BASE_URL } from './baseURL';
import {
  GetResponseType,
  GetTagResponseType,
  GetVersionType,
  PostResponseType,
  PostTagResponseType,
} from './types';

const instance = axios.create({
  baseURL: BASE_URL,
});

type GetConfigType = {
  params: {
    direction: number;
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

type PostsTypeType = 'important' | 'latest' | 'latest-by-direction';

export const getPosts = (
  postsType: PostsTypeType,
  config?: GetConfigType,
): Promise<AxiosResponse<GetResponseType<PostResponseType>>> => {
  return instance.get<GetResponseType<PostResponseType>>(
    `/post/${postsType}`,
    config,
  );
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
