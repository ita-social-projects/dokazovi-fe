/* eslint-disable no-param-reassign */
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import qs from 'qs';
import { LocalStorageKeys } from '../../types';
import { BASE_URL } from '../../../apiURL';
import {
  ExpertResponseType,
  GetRegionsType,
  GetResponseType,
  GetTagResponseType,
  GetPostResponseType,
  GetDirectionType,
  GetVersionType,
  PostResponseType,
  PostTagResponseType,
  PostPostRequestType,
  PostLoginResponseType,
} from './types';

export const instance = axios.create({
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
    regions?: string[];
    tag?: string[];
  };
};

export type GetExpertsConfigType = GetConfigType & {
  params: { directions?: string[]; regions?: string[] };
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

instance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const jwtToken = localStorage.getItem(LocalStorageKeys.ACCESS_TOKEN);
    if (jwtToken) {
      const header = `Bearer ${jwtToken}`;
      config.headers = { authorization: header };
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  },
);

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

export const getPostById = (
  id: number,
): Promise<AxiosResponse<PostResponseType>> => {
  return instance.get(`/post/${id}`);
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

export const getPostTypes = (): Promise<AxiosResponse<GetPostResponseType>> => {
  return instance.get('post/type');
};

export const getRegions = (): Promise<AxiosResponse<GetRegionsType[]>> => {
  return instance.get(`/region`);
};

export const getDirection = (): Promise<AxiosResponse<GetDirectionType>> => {
  return instance.get(`/direction`);
};

export const postPublishPost = (
  requestBody: PostPostRequestType,
): Promise<AxiosResponse<PostResponseType>> => {
  return instance.post(`/post`, requestBody);
};

export const loginService = (
  email: string,
  password: string,
): Promise<AxiosResponse<PostLoginResponseType>> => {
  return instance.post('/auth/login', { email, password });
};

export const getCurrentUser = (): Promise<
  AxiosResponse<ExpertResponseType>
> => {
  return instance.get('/user/me');
};
