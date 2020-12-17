import { lazy } from 'react';
import { RenderRoutes } from './Router';
import { IRouterConfig } from './types';

const MainView = lazy(() => import('../modules/main/components/MainView'));
const DirectionsList = lazy(
  () => import('../modules/direction/components/DirectionsList'),
);
const DirectionView = lazy(
  () => import('../modules/direction/components/DirectionView'),
);
const ExpertsView = lazy(
  () => import('../modules/experts/components/ExpertsView'),
);

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
          },
        ],
      },
    ],
  },
  {
    path: '/experts',
    key: 'EXPERTS',
    exact: true,
    component: ExpertsView,
  },
];

export default ROUTER_CONFIG;
