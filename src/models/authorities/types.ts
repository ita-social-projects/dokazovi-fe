import { LoadingStatusEnum } from '../../old/lib/types';

export interface Authority {
  data?: string[];
  loading: LoadingStatusEnum;
  error: string | null;
}
