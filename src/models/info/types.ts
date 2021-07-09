import { LoadingStatusEnum } from '../../old/lib/types';
import { PlatformInformationType } from '../../old/lib/utilities/API/types';

export interface IInfoState {
  [id: number]: {
    data?: PlatformInformationType;
    loading: LoadingStatusEnum;
    error: null | string;
  };
}
