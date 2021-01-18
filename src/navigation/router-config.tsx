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
const ExpertProfileView = lazy(
  () => import('../modules/experts/components/ExpertProfileView'),
);
const PostView = lazy(() => import('../modules/posts/components/PostView'));
const ArticleCreationView = lazy(
  () => import('../modules/postCreation/ArticleCreationView'),
);
const NoteCreationView = lazy(
  () => import('../modules/postCreation/NoteCreationView'),
);

const ROUTER_CONFIG: IRouterConfig[] = [
  {
    path: '/',
    key: 'ROOT',
    exact: true,
    component: MainView,
    title: 'Головна',
  },
  {
    path: '/direction',
    key: 'DIRECTION',
    component: RenderRoutes,
    routes: [
      {
        path: '/direction',
        key: 'DIRECTION_ROOT',
        exact: true,
        component: DirectionsList,
        title: 'Напрямки',
      },
      {
        path: '/direction/:name',
        key: 'DIRECTION_COMPONENT',
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
      {
        path: '/experts',
        key: 'EXPERTS_LIST',
        exact: true,
        component: ExpertsView,
        title: 'Експерти',
      },
      {
        path: '/experts/:expertId',
        key: 'EXPERT_PROFILE',
        exact: true,
        component: ExpertProfileView,
      },
    ],
  },
  {
    path: '/create-article',
    key: 'ARTICLE',
    exact: true,
    component: ArticleCreationView,
    title: 'Створити статтю',
  },
  {
    path: '/create-note',
    key: 'NOTE',
    exact: true,
    component: NoteCreationView,
    title: 'Створити допис',
  },
  {
    path: '/posts/:postId',
    key: 'POST_PROFILE',
    exact: true,
    component: PostView,
  },
];

export default ROUTER_CONFIG;
