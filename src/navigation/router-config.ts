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
const PostCreationPreview = lazy(
  () => import('../modules/postCreation/components/PostCreationPreview'),
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
    key: 'ARTICLE',
    component: RenderRoutes,
    private: true,
    routes: [
      {
        path: '/create-article',
        key: 'ARTICLE',
        exact: true,
        component: ArticleCreation,
      },
      {
        path: '/create-article/preview',
        key: 'ARTICLE_PREVIEW',
        exact: true,
        component: PostCreationPreview,
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
      },
      {
        path: '/create-note/preview',
        key: 'NOTE_PREVIEW',
        exact: true,
        component: PostCreationPreview,
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
      },
      {
        path: '/create-video/preview',
        key: 'VIDEO_PREVIEW',
        exact: true,
        component: PostCreationPreview,
      },
    ],
  },
  {
    path: '/update-article',
    key: 'ARTICLE-UPDATE',
    component: RenderRoutes,
    private: true,
    routes: [
      {
        path: '/update-article/:postId',
        key: 'ARTICLE-UPDATE',
        exact: true,
        component: PostUpdationWrapper,
      },
      {
        path: '/update-article/preview',
        key: 'ARTICLE-UPDATE-PREVIEW',
        exact: true,
        component: PostCreationPreview,
      },
    ],
  },
  {
    path: '/update-note',
    key: 'NOTE-UPDATE',
    component: RenderRoutes,
    private: true,
    routes: [
      {
        path: '/update-note/:postId',
        key: 'NOTE-UPDATE',
        exact: true,
        component: PostUpdationWrapper,
      },
      {
        path: '/update-note/preview',
        key: 'NOTE-UPDATE-PREVIEW',
        exact: true,
        component: PostCreationPreview,
      },
    ],
  },
  {
    path: '/update-video/:postId',
    key: 'VIDEO-UPDATE',
    component: RenderRoutes,
    private: true,
    routes: [
      {
        path: '/update-video',
        key: 'VIDEO-UPDATE',
        exact: true,
        component: PostUpdationWrapper,
      },
      {
        path: '/update-video/preview',
        key: 'VIDEO-UPDATE-PREVIEW',
        exact: true,
        component: PostCreationPreview,
      },
    ],
  },
  {
    path: '/posts/:postId',
    key: 'POST_PROFILE',
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
