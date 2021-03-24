import { lazy } from 'react';
import Oath2Redirect from '../lib/components/Service/Oath2Redirect';
import { RenderRoutes } from './Router';
import { IRouterConfig } from './types';

const MainView = lazy(() => import('../modules/main/components/MainView'));
const MaterialsView = lazy(
  () => import('../modules/materials/components/MaterialsView'),
);
const ExpertsView = lazy(
  () => import('../modules/experts/components/ExpertsView'),
);
const ExpertProfileViewWrapper = lazy(
  () => import('../modules/experts/components/ExpertProfileViewWrapper'),
);
const PostViewWrapper = lazy(
  () => import('../modules/posts/components/PostViewWrapper'),
);
const ArticleCreation = lazy(
  () => import('../modules/postCreation/components/ArticleCreation'),
);
const NoteCreation = lazy(
  () => import('../modules/postCreation/components/NoteCreation'),
);
const VideoCreation = lazy(
  () => import('../modules/postCreation/components/VideoCreation'),
);
const PostUpdationWrapper = lazy(
  () => import('../modules/postUpdation/components/PostUpdationWrapper'),
);
const Page404 = lazy(() => import('../lib/components/Errors/Page404'));

const ROUTER_CONFIG: IRouterConfig[] = [
  {
    path: '/',
    key: 'ROOT',
    exact: true,
    component: MainView,
  },
  {
    path: '/materials',
    key: 'MATERIALS',
    component: MaterialsView,
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
      },
      {
        path: '/experts/:expertId',
        key: 'EXPERT_PROFILE',
        exact: true,
        component: ExpertProfileViewWrapper,
      },
    ],
  },
  {
    path: '/create-article',
    key: 'CREATE_ARTICLE',
    component: ArticleCreation,
    private: true,
    exact: true,
  },
  {
    path: '/create-note',
    key: 'CREATE_NOTE',
    component: NoteCreation,
    private: true,
    exact: true,
  },
  {
    path: '/create-video',
    key: 'CREATE_VIDEO',
    component: VideoCreation,
    private: true,
    exact: true,
  },
  {
    path: '/update-article/:postId',
    key: 'UPDATE_ARTICLE',
    component: PostUpdationWrapper,
    private: true,
    exact: true,
  },
  {
    path: '/update-note/:postId',
    key: 'UPDATE_NOTE',
    component: PostUpdationWrapper,
    private: true,
    exact: true,
  },
  {
    path: '/update-video/:postId',
    key: 'UPDATE_VIDEO',
    component: PostUpdationWrapper,
    private: true,
    exact: true,
  },
  {
    path: '/posts/:postId',
    key: 'POST',
    exact: true,
    component: PostViewWrapper,
  },
  {
    path: '/error_404',
    key: 'ERROR_404',
    exact: true,
    component: Page404,
  },
  {
    path: '/oauth2/redirect',
    key: 'oauth2/redirect',
    exact: true,
    component: Oath2Redirect,
  },
];

export default ROUTER_CONFIG;
