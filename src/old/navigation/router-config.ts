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
const Profile = lazy(() => import('../../views/Profile/Profile'));
const ArticleCreation = lazy(
  () => import('../../views/postCreation/ArticleCreation'),
);
const NoteCreation = lazy(
  () => import('../../views/postCreation/NoteCreation'),
);
const VideoCreation = lazy(
  () => import('../../views/postCreation/VideoCreation/VideoCreation'),
);
const PostUpdationWrapper = lazy(
  () => import('../../views/postUpdation/PostUpdationWrapper'),
);
const AdminPage = lazy(
  () => import('../lib/components/Users/AdminPage/components/AdminPageWrapper'),
);
const Oath2Redirect = lazy(
  () => import('../lib/components/Service/Oath2Redirect'),
);
const Conditions = lazy(() => import('../../views/Conditions/Conditions'));
const Page404 = lazy(() => import('../lib/components/Errors/Page404'));

const PasswordResetView = lazy(
  () => import('../../views/PasswordReset/PasswordResetView'),
);

const PasswordUpdateView = lazy(
  () => import('../../views/PasswordUpdate/PasswordUpdateView'),
);
const PersonalInfo = lazy(
  () => import('../../views/Profile/PersonalInfo/PersonalInfo'),
);
const EditAuthor = lazy(
  () => import('../../views/Profile/EditAuthor/EditAuthor'),
);

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
    path: '/reset-password',
    key: 'PASSWORD_RESET',
    component: PasswordResetView,
  },
  {
    path: '/user/update-password',
    key: 'UPDATE_PASSWORD',
    component: PasswordUpdateView,
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
    path: '/profile',
    key: 'PROFILE',
    component: Profile,
    private: true,
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
    path: '/create-author',
    key: 'CREATE_AUTHOR',
    component: PersonalInfo,
    private: true,
    exact: true,
  },
  {
    path: '/edit-author',
    key: 'EDIT_AUTHOR',
    component: EditAuthor,
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
    path: '/info',
    key: 'INFO',
    exact: true,
    component: Conditions,
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
  {
    path: '/opendoctorgate',
    key: 'ROOT',
    exact: true,
    component: MainView,
  },
];
