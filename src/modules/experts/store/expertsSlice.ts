import { IPost, LoadingStatusEnum } from '../../../lib/types';
import { IExpertPayload } from '../../main/store/mainSlice';

export interface IExpertsState {
  experts: IExpertPayload;
  materials: IMaterialsPayload;
}

interface IMaterialsPayload {
    posts: IPost[];
    meta: 
}

const initialState: IExpertsState = {
  experts: {
    experts: [],
    meta: {
      loading: LoadingStatusEnum.idle,
      error: null,
      directionFilter: null,
      regionFilter: null,
    },
  },
  materials: [],
};
