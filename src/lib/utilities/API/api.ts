import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { BASE_URL } from './baseURL';
import {
  GetPostsResponseType,
  ImportantPostResponseType,
  LatestPostResponseType,
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

type PostsTypeType = 'important' | 'latest';

export const getPosts = (
  postsType: PostsTypeType,
  config?: GetPostConfigType,
): Promise<
  AxiosResponse<
    GetPostsResponseType<ImportantPostResponseType | LatestPostResponseType>
  >
> => {
  if (postsType === 'important') {
    return instance.get<GetPostsResponseType<ImportantPostResponseType>>(
      `/post/${postsType}`,
      config,
    );
  }
  return instance.get<GetPostsResponseType<LatestPostResponseType>>(
    `/post/${postsType}`,
    config,
  );
};

export const getExperts = () => {
  return instance.get(`/user/experts`);
};

export const getVersion = () => {
  return instance.get(`/version`);
};
