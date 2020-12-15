import { lazy } from 'react';
import { RenderRoutes } from './Router';
import { IRouterConfig } from './types';

const DirectionView = lazy(
  () => import('../modules/direction/components/DirectionView'),
);
const MainView = lazy(() => import('../modules/main/components/MainView'));
const ExpertProfileView = lazy(
  () => import('../modules/experts/components/ExpertProfileView'),
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
    component: RenderRoutes,
    routes: [
      // {
      //   path: '/experts',
      //   key: 'EXPERTS_LIST',
      //   exact: true,
      //   component: ExpertsListView,
      // },
      {
        path: '/experts/:expertId',
        key: 'EXPERT_PROFILE',
        exact: true,
        component: ExpertProfileView,
      },
    ]
  }
];

export default ROUTER_CONFIG;
