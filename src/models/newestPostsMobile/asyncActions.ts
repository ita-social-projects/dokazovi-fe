/* eslint-disable */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getPosts } from '../../old/lib/utilities/API/api';
import { IFetchMaterialsOptions } from '../materials/types';

export const fetchNewestMobile = createAsyncThunk(
  'materials/mobile',
  async (options: IFetchMaterialsOptions, { getState, rejectWithValue }) => {
    try {
      const { mobileMaterials } = getState() as any;
      const { page, type, url = 'all-posts' } = options;

      switch (type) {
        case 'expertOpinion':
          const expertOpinion = await getPosts(url, {
            params: {
              page,
              size: 5,
              types: [1, 2, 3],
              directions: [1, 6, 7, 4, 1, 3, 2],
              origins: [1],
              sort: ['published_at,desc'],
            },
          });
          return {
            ...mobileMaterials.data,
            expertOpinion: {
              isLastPage: expertOpinion.data.last,
              data: [
                ...mobileMaterials.data.expertOpinion.data,
                ...expertOpinion.data.content,
              ],
            },
          };
        case 'translation':
          const translation = await getPosts(url, {
            params: {
              page,
              size: 5,
              types: [1, 2, 3],
              directions: [1, 6, 7, 4, 1, 3, 2],
              origins: [3],
              sort: ['published_at,desc'],
            },
          });
          return {
            ...mobileMaterials.data,
            translation: {
              isLastPage: translation.data.last,
              data: [
                ...mobileMaterials.data.translation.data,
                ...translation.data.content,
              ],
            },
          };
        case 'media':
          const media = await getPosts(url, {
            params: {
              page,
              size: 5,
              types: [1, 2, 3],
              directions: [1, 6, 7, 4, 1, 3, 2],
              origins: [2],
              sort: ['published_at,desc'],
            },
          });
          return {
            ...mobileMaterials.data,
            media: {
              isLastPage: media.data.last,
              data: [...mobileMaterials.data.media.data, ...media.data.content],
            },
          };
        case 'video':
          const video = await getPosts(url, {
            params: {
              page,
              size: 5,
              types: [2],
              directions: [1, 6, 7, 4, 1, 3, 2],
              origins: [1, 2, 3],
              sort: ['published_at,desc'],
            },
          });
          return {
            ...mobileMaterials.data,
            video: {
              isLastPage: video.data.last,
              data: [...mobileMaterials.data.video.data, ...video.data.content],
            },
          };
        default:
          return { ...mobileMaterials.data };
      }
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);
