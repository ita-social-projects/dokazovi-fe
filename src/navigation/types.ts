export interface IRouterConfig {
    component: React.ComponentType<{
        routes: IRouterConfig[]
    }>,
    path: string,
    key?: string,
    exact?: boolean,
    routes?: IRouterConfig[],
}

export interface IRouterConfigWithoutRoutes {
    component: React.ComponentType
    path: string,
    key?: string,
    exact?: boolean,
    routes?: IRouterConfig[],
}
