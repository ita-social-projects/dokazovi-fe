/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import axios, { AxiosResponse } from 'axios';
import qs from 'qs';
import { BASE_URL } from './baseURL';
import {
  ExpertResponseType,
  GetResponseType,
  GetTagResponseType,
  GetVersionType,
  PostResponseType,
  PostTagResponseType,
} from './types';

const instance = axios.create({
  baseURL: BASE_URL,
});

export type GetConfigType = {
  params: {
    page?: number;
    size?: number;
    sort?: string[];
    direction?: number;
    type?: number;
    tag?: string;
  };
};

export type GetExpertsConfigType = GetConfigType & {
  params: { directions?: number[] };
};

export type GetTagConfigType = {
  params: {
    value: string;
    limit?: number;
  };
};

export type PostTagRequestBodyType = {
  tag: string;
};

const defaultConfig = {
  paramsSerializer: (params: { [key: string]: any }): string => {
    return qs.stringify(params, { arrayFormat: 'repeat' });
  },
};

type PostsTypeType = 'important' | 'latest' | 'latest-by-direction';

export const getPosts = (
  postsType: PostsTypeType,
  config?: GetConfigType,
): Promise<AxiosResponse<GetResponseType<PostResponseType>>> => {
  return instance.get<GetResponseType<PostResponseType>>(`/post/${postsType}`, {
    ...defaultConfig,
    ...config,
  });
};

export const getExperts = (
  config?: GetExpertsConfigType,
): Promise<AxiosResponse<GetResponseType<ExpertResponseType>>> => {
  return instance.get(`/user/random-experts`, { ...defaultConfig, ...config });
};

export const postTag = (
  requestBody: PostTagRequestBodyType,
): Promise<AxiosResponse<PostTagResponseType>> => {
  return instance.post(`/tag`, requestBody);
};

export const getTag = (
  config: GetTagConfigType,
): Promise<AxiosResponse<GetTagResponseType>> => {
  return instance.get(`/tag/findByValue`, { ...defaultConfig, ...config });
};

export const getVersion = (): Promise<AxiosResponse<GetVersionType>> => {
  return instance.get(`/version`);
};
