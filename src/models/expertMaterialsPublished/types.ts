import { IFetchExpertsMaterialsOptions } from '../expertMaterials/types';

export interface IFetchExpertsMaterialsPublishedOptions
  extends IFetchExpertsMaterialsOptions {
  status: string;
}
