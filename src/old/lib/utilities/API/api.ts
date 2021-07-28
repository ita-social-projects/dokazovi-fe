/* eslint-disable no-param-reassign */
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import qs from 'qs';
import { toast } from 'react-toastify';
import {
  CreatePostRequestUnionType,
  CreateTagRequestType,
  DirectionResponseType,
  ExpertResponseType,
  ExpertsResponseType,
  GetExpertsConfigType,
  GetPostsConfigType,
  GetFilteredPostsType,
  GetTagsConfigType,
  LoginResponseType,
  NewestPostsResponseType,
  OriginResponseType,
  PostResponseType,
  PostsResponseType,
  PostTypeResponseType,
  RegionResponseType,
  TagResponseType,
  UpdatePostRequestUnionType,
  VersionResponseType,
  ActivePostType,
  PlatformInformationType,
  UpdatePlatformInformationRequestType,
} from './types';
import { BASE_URL } from '../../../apiURL';
import { getToken } from '../../../provider/AuthProvider/getToken';

export const instance = axios.create({
  baseURL: BASE_URL,
});

instance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const jwtToken = getToken();
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

instance.interceptors.response.use(undefined, (error: AxiosError) => {
  if (error.message === 'Network Error' && !error.response) {
    toast.error("The server isn't responding...");
  }

  if (!error.response) {
    throw error;
  }

  if (error.response.status === 500) {
    toast.error('A server error occurred...');
  }

  throw error;
});

const defaultConfig = {
  paramsSerializer: (params: { [key: string]: unknown }): string => {
    return qs.stringify(params, { arrayFormat: 'repeat' });
  },
};

export type GetPostsRequestType =
  | 'important'
  | 'latest-all'
  | 'latest-by-expert'
  | 'latest-by-expert-and-status'
  | 'all-posts'
  | 'set-important'
  | 'get-by-important-image';

export const getPosts = async (
  postsRequestType: GetPostsRequestType,
  config?: GetPostsConfigType,
): Promise<AxiosResponse<PostsResponseType>> => {
  return instance.get(`/post/${postsRequestType}`, {
    ...defaultConfig,
    ...config,
  });
};

export const getActivePostTypes = async (
  userId: number,
  status?: string,
): Promise<AxiosResponse<ActivePostType[]>> => {
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  return instance.get(`/post-types/${userId}?status=${status}`);
};

export const getNewestPosts = async (): Promise<
  AxiosResponse<NewestPostsResponseType>
> => {
  return instance.get(`/post/latest`);
};

export const getRandomExperts = async (
  config?: GetExpertsConfigType,
): Promise<AxiosResponse<ExpertsResponseType>> => {
  return instance.get(`/user/random-experts`, { ...defaultConfig, ...config });
};

export const getAllExperts = async (
  config?: GetExpertsConfigType,
): Promise<AxiosResponse<ExpertsResponseType>> => {
  return instance.get('/user/all-experts', { ...defaultConfig, ...config });
};

export const getUniquePostViewsCounter = async (
  id: number,
): Promise<AxiosResponse<number>> => {
  return instance.get('/post/post-view-count', {
    params: {
      url: `/posts/${id}`,
    },
  });
};

export const getPostById = async (
  id: number,
): Promise<AxiosResponse<PostResponseType>> => {
  return instance.get(`/post/${id}`);
};

export const getExpertById = async (
  id: number,
): Promise<AxiosResponse<ExpertResponseType>> => {
  return instance.get(`/user/${id}`);
};

export const createTag = async (
  requestBody: CreateTagRequestType,
): Promise<AxiosResponse<TagResponseType>> =>
  instance.post(`/tag`, requestBody);

export const getTagsByValue = async (
  config: GetTagsConfigType,
): Promise<AxiosResponse<TagResponseType[]>> => {
  return instance.get(`/tag/find-by-value`, { ...defaultConfig, ...config });
};

export const getVersion = async (): Promise<
  AxiosResponse<VersionResponseType>
> => {
  return instance.get(`/version`);
};

export const getPostTypes = async (): Promise<
  AxiosResponse<PostTypeResponseType[]>
> => {
  return instance.get('post/type');
};

export const getPostsByStatus = async (
  postsRequestType: GetPostsRequestType,
  config?: GetFilteredPostsType,
): Promise<AxiosResponse<PostsResponseType>> => {
  return instance.get(`/post/${postsRequestType}`, {
    ...defaultConfig,
    params: {
      ...config,
    },
  });
};

export const getRegions = async (): Promise<
  AxiosResponse<RegionResponseType[]>
> => {
  return instance.get(`/region`);
};

export const getDirections = async (): Promise<
  AxiosResponse<DirectionResponseType[]>
> => {
  return instance.get(`/direction`);
};

export const getOrigins = async (): Promise<
  AxiosResponse<OriginResponseType[]>
> => {
  return instance.get(`/origin`);
};

export const createPost = async (
  requestBody: CreatePostRequestUnionType,
): Promise<AxiosResponse<PostResponseType>> => {
  return instance.post(`/post`, requestBody);
};

export const updatePost = async (
  requestBody: UpdatePostRequestUnionType,
): Promise<AxiosResponse<PostResponseType>> => {
  return instance.post(`/post`, requestBody);
};

export const login = async (
  email: string,
  password: string,
): Promise<AxiosResponse<LoginResponseType>> => {
  return instance.post('/auth/login', { email, password });
};

export const getCurrentUser = async (): Promise<
  AxiosResponse<ExpertResponseType>
> => {
  return instance.get('/user/me');
};

export const deletePostById = async (
  id: number,
): Promise<AxiosResponse<PostsResponseType>> => {
  return instance.delete(`/post/${id}`);
};

export const getPlatformInformation = async (
  id: number,
): Promise<AxiosResponse<PlatformInformationType>> => {
  return instance.get(`/platform-information/${id}`);
};

export const updatePlatformInformation = async (
  requestBody: UpdatePlatformInformationRequestType,
): Promise<AxiosResponse<PlatformInformationType>> => {
  return instance.put(`/platform-information/`, requestBody);
};
