import { IFetchExpertsMaterialsOptions } from '../expertMaterials/types';
import { IPost } from '../../old/lib/types';

export interface IFetchExpertsMaterialsDraftOptions
  extends IFetchExpertsMaterialsOptions {
  status: string;
  materialsDraft?: IPost[];
}
