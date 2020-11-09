import { lazy } from 'react';
import { RenderRoutes } from './Router';
import { IRouterConfig } from './types';

const DirectionView = lazy(() => import('../modules/direction/components/DirectionView'));
const MainView = lazy(() => import('../modules/main/components/MainView'));
const Header = lazy(() => import('../modules/main/components/Header/Header'));

// router cfg will go here
const ROUTER_CONFIG: IRouterConfig[] = [
    { path: '/', key: 'HEADER', exact: false, component: Header },
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
                component: DirectionView,
            },
            {
                path: '/direction/covid-19',
                key: 'DIRECTION_COVID',
                exact: true,
                component: DirectionView,
            },
        ],
    },
];

export default ROUTER_CONFIG;
