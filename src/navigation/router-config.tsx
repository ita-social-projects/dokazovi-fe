import { lazy } from 'react';
import { RenderRoutes } from './Router';
import { IRouterConfig } from './types';

const DirectionView = lazy(() => import('../modules/direction/components/DirectionView'));
const MainView = lazy(() => import('../modules/main/components/MainView'));
const DirectionsList = lazy(() => import('../modules/direction/components/DirectionsList'));

const ROUTER_CONFIG: IRouterConfig[] = [
    { path: '/', key: 'ROOT', exact: true, component: MainView },
    {
        path: '/direction',
        key: 'DIRECTION',
        exact: false,
        component: RenderRoutes,
        routes: [
            {
                path: '/direction',
                key: 'DIRECTION_ROOT',
                exact: true,
                component: DirectionsList,
            },
            {
                path: '/direction/:id',
                key: 'DIRECTION_COMPONENT',
                exact: true,
                component: DirectionView,
            }
        ],
    },
];


export default ROUTER_CONFIG;
