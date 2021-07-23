import { IFetchExpertsMaterialsOptions } from '../expertMaterials/types';
import { IPost } from '../../old/lib/types';

export interface IFetchExpertsMaterialsPublishedOptions
  extends IFetchExpertsMaterialsOptions {
  status: string;
  materialsPublished?: IPost[];
}
