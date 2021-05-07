import { IExpert, LoadingStatusEnum } from '../../old/lib/types';

export interface IUserState {
  data?: IExpert;
  loading: LoadingStatusEnum;
  error: string | null;
}
