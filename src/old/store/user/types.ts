import { IExpert, LoadingStatusEnum } from '../../lib/types';

export interface IUserState {
  data?: IExpert;
  loading: LoadingStatusEnum;
  error: string | null;
}
