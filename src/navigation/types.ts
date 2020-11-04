import { RenderRoutes } from './Router'

type RenderRoutesType = typeof RenderRoutes;

export interface IRouterConfig {
    component: React.ComponentType | RenderRoutesType, // double check
    path: string,
    key: string,
    exact?: boolean,
    routes?: IRouterConfig[],
  }