
export interface IRouterConfig {
    component: React.ComponentType<{
        routes: IRouterConfig[]
    }>, // double check
    path: string,
    key?: string,
    exact?: boolean,
    routes?: IRouterConfig[],
}


