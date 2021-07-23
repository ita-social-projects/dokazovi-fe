import { IFetchExpertsMaterialsOptions } from '../expertMaterials/types';

export interface IFetchExpertsMaterialsDraftOptions
  extends IFetchExpertsMaterialsOptions {
  status: string;
}
