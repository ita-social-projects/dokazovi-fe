import { LoadingStatusEnum } from '../../old/lib/types';

export interface IAuthority {
  data?: string[];
  loading: LoadingStatusEnum;
  error: string | null;
}
