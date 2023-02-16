/* eslint-disable */
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  IFetchExpertsOptions,
  IExpertsAutorsListOptions,
  IExpertsDeleteAutor,
} from './types';
import {
  deleteAuthorById,
  getAllExperts,
} from '../../old/lib/utilities/API/api';
import { LOAD_EXPERTS_LIMIT } from '../../old/lib/constants/experts';
import { IExpert } from '../../old/lib/types';
import { ExpertResponseType } from '../../old/lib/utilities/API/types';

export const mapFetchedExperts = (
  experts: ExpertResponseType[],
): { mappedExperts: IExpert[]; ids: number[] } => {
  const ids: number[] = experts.map((expert) => expert.id);

  return { mappedExperts: experts, ids };
};

export const fetchExperts = createAsyncThunk(
  'experts/loadExperts',
  async (options: IFetchExpertsOptions, { getState, rejectWithValue }) => {
    try {
      const { page, regions, directions, appendExperts } = options;
      const response = await getAllExperts({
        params: {
          page,
          size: LOAD_EXPERTS_LIMIT,
          regions: regions.some((region) => region === 0) ? [] : regions,
          directions: directions.some((dir) => dir === 0) ? [] : directions,
          sort: 'lastName',
        },
      });

      const {
        experts: { data },
      } = getState() as any;

      const { mappedExperts, ids } = mapFetchedExperts(response.data.content);
      const experts = { ...data.experts };
      mappedExperts.forEach((expert) => {
        if (experts && expert.id) {
          experts[expert.id] = expert;
        }
      });

      const appendIds = [
        ...new Set(appendExperts ? data.expertIds.concat(ids) : ids),
      ];

      return {
        expertIds: appendIds,
        experts,
        totalPages: response.data.totalPages,
        totalElements: response.data.totalElements,
        isLastPage: response.data.last,
        appendExperts,
      };
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  },
);

export const fetchExpertsAutorsList = createAsyncThunk(
  'experts/loadExpertsAuthorsList',
  async (options: IExpertsAutorsListOptions, { getState, rejectWithValue }) => {
    try {
      const {
        experts: {
          data,
          meta: {
            size,
            textFields: { author },
            sort: { order, sortBy },
          },
        },
      } = getState() as any;

      const { page } = options;
      const response = await getAllExperts({
        params: {
          page,
          size: size,
          sort: author ? undefined : `${sortBy},${order}`,
          userName: author,
        },
      });

      response.data.content.forEach((expert) => {
        expert['isAllowedToDelete'] = expert.postStatuses.every(
          (postStatus) => postStatus.status === 'DRAFT',
        );
      });

      const { mappedExperts, ids } = mapFetchedExperts(response.data.content);
      const experts = { ...data.experts };
      mappedExperts.forEach((expert) => (experts[expert.id] = expert));

      return {
        expertIds: ids,
        experts,
        totalPages: response.data.totalPages,
        totalElements: response.data.totalElements,
        isLastPage: response.data.last,
        pageNumber: response.data.number,
      };
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  },
);

export const deleteAuthor = createAsyncThunk(
  'experts/deleteAuthor',
  async (options: IExpertsDeleteAutor, { getState, rejectWithValue }) => {
    try {
      const { id } = options;
      await deleteAuthorById(id);
      const {
        experts: { data },
      } = getState() as any;
      const ids = data.expertIds.filter((expertId: number) => expertId !== id);
      return { ...data, expertIds: ids };
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  },
);
