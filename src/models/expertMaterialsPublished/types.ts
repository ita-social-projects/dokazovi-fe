import { IFetchExpertsMaterialsOptions } from '../expertMaterials/types';
import { IPost } from '../../old/lib/types';
import { IFilter } from '../materials/types';

export interface IFetchExpertsMaterialsPublishedOptions
  extends Omit<IFetchExpertsMaterialsOptions, 'filters'> {
  status: string;
  materialsPublished?: IPost[];
  filters: IFilter;
}
