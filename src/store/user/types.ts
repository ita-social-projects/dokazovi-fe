import { IExpert, LoadingStatusEnum } from '../../lib/types';

export interface IUserState {
  data?: IExpert | unknown;
  loading: LoadingStatusEnum;
  error: string | null;
}
