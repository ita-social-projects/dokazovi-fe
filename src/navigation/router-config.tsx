import { lazy } from 'react';
import { RenderRoutes } from './Router';
import { IRouterConfig } from './types';

const MainView = lazy(() => import('../modules/main/components/MainView'));
const DirectionView = lazy(
  () => import('../modules/direction/components/DirectionView'),
);
const ExpertsView = lazy(
  () => import('../modules/experts/components/ExpertsView'),
);

// router cfg will go here
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
        // TODO: render list of all directions here
        component: DirectionView,
      },
      {
        path: '/direction/covid-19',
        key: 'DIRECTION_COVID',
        exact: true,
        component: DirectionView,
      },
      {
        path: '/direction/therapy',
        key: 'DIRECTION_COVID',
        exact: true,
        component: DirectionView,
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
