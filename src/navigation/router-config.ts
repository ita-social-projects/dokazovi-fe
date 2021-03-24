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
const PostPreviewWrapper = lazy(
  () => import('../modules/postCreation/components/PostPreviewWrapper'),
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
    component: RenderRoutes,
    private: true,
    routes: [
      {
        path: '/create-article',
        key: 'CREATE_ARTICLE',
        exact: true,
        component: ArticleCreation,
      },
      {
        path: '/create-article/preview',
        key: 'CREATE_ARTICLE_PREVIEW',
        exact: true,
        component: PostPreviewWrapper,
      },
    ],
  },
  {
    path: '/create-note',
    key: 'CREATE_NOTE',
    component: RenderRoutes,
    private: true,
    routes: [
      {
        path: '/create-note',
        key: 'CREATE_NOTE',
        exact: true,
        component: NoteCreation,
      },
      {
        path: '/create-note/preview',
        key: 'CREATE_NOTE_PREVIEW',
        exact: true,
        component: PostPreviewWrapper,
      },
    ],
  },
  {
    path: '/create-video',
    key: 'CREATE_VIDEO',
    component: RenderRoutes,
    private: true,
    routes: [
      {
        path: '/create-video',
        key: 'CREATE_VIDEO',
        exact: true,
        component: VideoCreation,
      },
      {
        path: '/create-video/preview',
        key: 'CREATE_VIDEO_PREVIEW',
        exact: true,
        component: PostPreviewWrapper,
      },
    ],
  },
  {
    path: '/update-article/:postId',
    key: 'UPDATE_ARTICLE',
    component: RenderRoutes,
    private: true,
    routes: [
      {
        path: '/update-article/preview',
        key: 'UPDATE_ARTICLE_PREVIEW',
        exact: true,
        component: PostPreviewWrapper,
      },
      {
        path: '/update-article/:postId',
        key: 'UPDATE_ARTICLE',
        exact: true,
        component: PostUpdationWrapper,
      },
    ],
  },
  {
    path: '/update-note/:postId',
    key: 'UPDATE_NOTE',
    component: RenderRoutes,
    private: true,
    routes: [
      {
        path: '/update-note/preview',
        key: 'UPDATE_NOTE_PREVIEW',
        exact: true,
        component: PostPreviewWrapper,
      },
      {
        path: '/update-note/:postId',
        key: 'UPDATE_NOTE',
        exact: true,
        component: PostUpdationWrapper,
      },
    ],
  },
  {
    path: '/update-video/:postId',
    key: 'UPDATE_VIDEO',
    component: RenderRoutes,
    private: true,
    routes: [
      {
        path: '/update-video/preview',
        key: 'UPDATE_VIDEO_PREVIEW',
        exact: true,
        component: PostPreviewWrapper,
      },
      {
        path: '/update-video/:postId',
        key: 'UPDATE_VIDEO',
        exact: true,
        component: PostUpdationWrapper,
      },
    ],
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
