import axios, { AxiosResponse } from 'axios';
import qs from 'qs';
import { BASE_URL } from './baseURL';
import {
  ExpertResponseType,
  GetResponseType,
  GetTagResponseType,
  GetPostResponseType,
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
    type?: string[];
    expert?: number;
    region?: string[];
    tag?: string[];
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

type PostsTypeType =
  | 'important'
  | 'latest'
  | 'latest-by-direction'
  | 'latest-by-expert';

export const getPosts = (
  postsType: PostsTypeType,
  config?: GetConfigType,
): Promise<AxiosResponse<GetResponseType<PostResponseType>>> => {
  return instance.get<GetResponseType<PostResponseType>>(`/post/${postsType}`, {
    ...defaultConfig,
    ...config,
  });
};

export const getPostTypes = (): Promise<AxiosResponse<GetPostResponseType>> => {
  return instance.get(`/post/type`);
};

export const getExperts = (
  config?: GetExpertsConfigType,
): Promise<AxiosResponse<GetResponseType<ExpertResponseType>>> => {
  return instance.get(`/user/random-experts`, { ...defaultConfig, ...config });
};

export const getAllExperts = (
  config?: GetExpertsConfigType,
): Promise<AxiosResponse<GetResponseType<ExpertResponseType>>> => {
  return instance.get('user/all-experts', { ...defaultConfig, ...config });
};

export const getExpertById = (
  id: number,
): Promise<AxiosResponse<ExpertResponseType>> => {
  return instance.get(`/user/${id}`);
};

export const postTag = (
  requestBody: PostTagRequestBodyType,
): Promise<AxiosResponse<PostTagResponseType>> => {
  return instance.post(`/tag`, requestBody);
};

export const getTag = (
  config: GetTagConfigType,
): Promise<AxiosResponse<GetTagResponseType>> => {
  return instance.get(`/tag/find-by-value`, { ...defaultConfig, ...config });
};

export const getVersion = (): Promise<AxiosResponse<GetVersionType>> => {
  return instance.get(`/version`);
};
