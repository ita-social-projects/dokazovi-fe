export enum LoadData {
  LOAD_MATERIALS = 'LOAD_MATERIALS',
  LOAD_EXPERTS = 'LOAD_EXPERTS',
}

export interface IMaterialsItem {}

export interface IExpertsItem {}

export interface IMaterialsAction {
  type: LoadData.LOAD_MATERIALS;
  value: IMaterialsItem[];
}
export interface IExpertsAction {
  type: LoadData.LOAD_EXPERTS;
  value: IExpertsItem[];
}

export type DirectionActionsType = IMaterialsAction | IExpertsAction;
