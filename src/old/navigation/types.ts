export interface IRouteConfig {
  component: React.ComponentType;
  path: string;
  key: string;
  exact?: boolean;
  private?: boolean;
}

export interface IVirtualHistoryRecord {
  key: string;
  pathname: string;
}
export interface IVirtualHistory {
  back: IVirtualHistoryRecord[];
  forward: IVirtualHistoryRecord[];
}

export interface ITransformPathnameConfig {}
