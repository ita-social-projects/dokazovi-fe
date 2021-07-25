import { IFetchExpertsMaterialsOptions } from '../expertMaterials/types';
import { IPost } from '../../old/lib/types';
import { IFilter } from '../materials/types';

export interface IFetchExpertsMaterialsDraftOptions
  extends Omit<IFetchExpertsMaterialsOptions, 'filters'> {
  status: string;
  materialsDraft?: IPost[];
  filters: IFilter;
}
