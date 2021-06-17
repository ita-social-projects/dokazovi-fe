import { lazy } from 'react';
import { IRouteConfig } from './types';

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
  () => import('../../features/postCreation/VideoCreation/VideoCreation'),
);
const PostUpdationWrapper = lazy(
  () => import('../modules/postUpdation/components/PostUpdationWrapper'),
);
const AdminPage = lazy(
  () => import('../lib/components/Users/AdminPage/components/AdminPageWrapper'),
);
const Oath2Redirect = lazy(
  () => import('../lib/components/Service/Oath2Redirect'),
);
const Page404 = lazy(() => import('../lib/components/Errors/Page404'));

export const ADMIN_ROUTER_CONFIG: IRouteConfig = {
  path: ['/admin', '/edit-post'],
  key: 'ADMIN_PAGE',
  component: AdminPage,
  private: true,
  exact: true,
  useRender: true,
};

export const ROUTER_CONFIG: IRouteConfig[] = [
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
    key: 'EXPERTS_LIST',
    component: ExpertsView,
    exact: true,
  },
  {
    path: '/experts/:expertId',
    key: 'EXPERT_PROFILE',
    component: ExpertProfileViewWrapper,
    exact: true,
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
    path: '/edit-post',
    key: 'UPDATE_POST',
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
