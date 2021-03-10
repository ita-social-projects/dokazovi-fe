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
const ExpertProfileView = lazy(
  () => import('../modules/experts/components/ExpertProfileView'),
);
const PostViewContainer = lazy(
  () => import('../modules/posts/components/PostViewContainer'),
);
const ArticleCreation = lazy(
  () => import('../modules/postCreation/ArticleCreation'),
);
const NoteCreation = lazy(() => import('../modules/postCreation/NoteCreation'));
const VideoCreation = lazy(
  () => import('../modules/postCreation/VideoCreation'),
);
const PostCreationPreview = lazy(
  () => import('../modules/postCreation/PostCreationPreview'),
);
const Page404 = lazy(() => import('../lib/components/Errors/Page404'));

const ROUTER_CONFIG: IRouterConfig[] = [
  {
    path: '/',
    key: 'ROOT',
    exact: true,
    component: MainView,
    title: 'Головна',
  },
  {
    path: '/materials',
    key: 'MATERIALS',
    component: MaterialsView,
    title: 'Матеріали',
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
    component: RenderRoutes,
    private: true,
    routes: [
      {
        path: '/create-article',
        key: 'ARTICLE',
        exact: true,
        component: ArticleCreation,
        title: 'Створення статті',
      },
      {
        path: '/create-article/preview',
        key: 'ARTICLE_PREVIEW',
        exact: true,
        component: PostCreationPreview,
        title: 'Попередній перегляд',
      },
    ],
  },
  {
    path: '/create-note',
    key: 'NOTE',
    component: RenderRoutes,
    private: true,
    routes: [
      {
        path: '/create-note',
        key: 'NOTE',
        exact: true,
        component: NoteCreation,
        title: 'Створення допису',
      },
      {
        path: '/create-note/preview',
        key: 'NOTE_PREVIEW',
        exact: true,
        component: PostCreationPreview,
        title: 'Попередній перегляд',
      },
    ],
  },
  {
    path: '/create-video',
    key: 'VIDEO',
    component: RenderRoutes,
    private: true,
    routes: [
      {
        path: '/create-video',
        key: 'VIDEO',
        exact: true,
        component: VideoCreation,
        title: 'Створення відео',
      },
      {
        path: '/create-video/preview',
        key: 'VIDEO_PREVIEW',
        exact: true,
        component: PostCreationPreview,
        title: 'Попередній перегляд',
      },
    ],
  },
  {
    path: '/posts/:postId',
    key: 'POST_PROFILE',
    exact: true,
    component: PostViewContainer,
    title: 'Пост',
  },
  {
    path: '/error_404',
    key: 'ERROR_404',
    exact: true,
    component: Page404,
    title: 'Помилка 404',
  },
  {
    path: '/oauth2/redirect',
    key: 'oauth2/redirect',
    exact: true,
    component: Oath2Redirect,
    title: '',
  },
];

export default ROUTER_CONFIG;
