import axios, { AxiosResponse } from 'axios';

const BASE_URL = 'https://api.imgur.com/3';
const CLIENT_ID = '4415dae57a57524';

export type ImgurPostResponseType = {
  data: { deletehash: string; link: string };
};

export const postImage = (
  url: string,
  config = {
    headers: {
      Authorization: `Client-ID ${CLIENT_ID}`,
    },
  },
): Promise<AxiosResponse<ImgurPostResponseType>> => {
  const formData = new FormData();
  formData.append('image', url);
  return axios.post(`${BASE_URL}/image`, formData, {
    method: 'post',
    ...config,
  });
};
