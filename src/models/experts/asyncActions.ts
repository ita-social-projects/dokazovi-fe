/* eslint-disable */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { IFetchExpertsOptions } from './types';
import { getAllExperts } from '../../old/lib/utilities/API/api';
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
          regions,
          directions,
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
        meta: {
          pageNumber: response.data.number,
          totalPages: response.data.totalPages,
          totalElements: response.data.totalElements,
          isLastPage: response.data.last,
          appendExperts,
        },
      };
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  },
);
