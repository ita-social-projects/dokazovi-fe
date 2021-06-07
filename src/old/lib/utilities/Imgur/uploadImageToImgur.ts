import axios, { AxiosResponse } from 'axios';

const BASE_URL = 'https://api.imgur.com/3';
const CLIENT_ID = '7a7ed86d4ab8dfc';

export type ImgurPostResponseType = {
  data: { deletehash: string; link: string };
  status: number;
};

export const uploadImageToImgur = (
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

// show the remaining limits to make requests to the imgurAPI
// By defalut imgur provide us approximately 1,250 uploads per day or approximately 12,500 requests per day.
// Max 12,500 requests - allowed during 1 month
// If the daily limit is hit five times in a month, then the app will be blocked for the rest of the month
export const getImgurImageLimits = (
  config = {
    headers: {
      Authorization: `Client-ID ${CLIENT_ID}`,
    },
  },
): Promise<AxiosResponse> => {
  return axios.get(`${BASE_URL}/credits`, {
    method: 'get',
    ...config,
  });
};
