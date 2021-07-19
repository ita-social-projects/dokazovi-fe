import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch, Redirect, RouteComponentProps } from 'react-router-dom';
import { IRouteConfig } from './types';
import Page from '../lib/components/Pages/Page';
import Page404 from '../lib/components/Errors/Page404';
import { LoadingStatusEnum } from '../lib/types';
import { LoadingContainer } from '../lib/components/Loading/LoadingContainer';
import { selectCurrentUser } from '../../models/user/selectors';

const PrivateRoute: React.FC<IRouteConfig> = ({ path, exact, component }) => {
  const user = useSelector(selectCurrentUser);

  if (
    user.loading === LoadingStatusEnum.idle ||
    user.loading === LoadingStatusEnum.pending
  ) {
    return (
      <Page
        component={() => <LoadingContainer loading={user.loading} expand />}
      />
    );
  }

  if (!user.data) {
    return <Redirect to="/" />;
  }

  return (
    <Route path={path} exact={exact}>
      <Page component={component} />
    </Route>
  );
};

const AdminRoute: React.FC<IRouteConfig> = ({ path, exact, component }) => {
  const renderAdminPage = (routeProps: RouteComponentProps) => {
    const castedLocationState = routeProps.history.location.state as {
      from: string;
    };
    // if we started editing a post from admin page, the page will be hidden, not unmounted
    const hidePage =
      routeProps.history.location.state &&
      castedLocationState.from === '/admin';

    if (
      routeProps.location.pathname !== '/admin' &&
      !routeProps.history.location.state
    ) {
      return null;
    }

    return (
      <div style={{ display: hidePage ? 'none' : 'initial' }}>
        <Page component={component} />
      </div>
    );
  };

  return <Route path={path} exact={exact} render={renderAdminPage} />;
};

export const RenderRoutes: React.FC<{
  routes: IRouteConfig[];
  adminRouterConfig: IRouteConfig;
}> = ({ routes, adminRouterConfig }) => (
  <>
    <AdminRoute
      key={adminRouterConfig.key}
      component={adminRouterConfig.component}
      path={adminRouterConfig.path}
      exact={adminRouterConfig.exact}
      useRender={adminRouterConfig.useRender}
    />
    <Switch>
      {routes.map((route: IRouteConfig) => {
        if (route.private) {
          return (
            <Route key={route.key} path={route.path} exact={route.exact}>
              <Page component={route.component} />
            </Route>
          );
        }
        return (
          <Route key={route.key} path={route.path} exact={route.exact}>
            <Page component={route.component} />
          </Route>
        );
      })}
      <Route path="/admin" />
      <Route>
        <Page component={Page404} />
      </Route>
    </Switch>
  </>
);
