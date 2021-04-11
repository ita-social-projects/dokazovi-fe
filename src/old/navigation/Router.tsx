import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import { IRouteConfig } from './types';
import Page from '../lib/components/Pages/Page';
import Page404 from '../lib/components/Errors/Page404';
import { RootStateType } from '../store/rootReducer';
import { LoadingStatusEnum } from '../lib/types';
import LoadingContainer from '../lib/components/Loading/LoadingContainer';

const PrivateRoute: React.FC<IRouteConfig> = ({ path, exact, component }) => {
  const { loading, user } = useSelector(
    (state: RootStateType) => state.currentUser,
  );

  if (
    loading === LoadingStatusEnum.idle ||
    loading === LoadingStatusEnum.pending
  ) {
    return (
      <Page component={() => <LoadingContainer loading={loading} expand />} />
    );
  }

  if (!user) {
    return <Redirect to="/" />;
  }

  return (
    <Route path={path} exact={exact}>
      <Page component={component} />
    </Route>
  );
};

export const RenderRoutes: React.FC<{ routes: IRouteConfig[] }> = ({
  routes,
}) => (
  <Switch>
    {routes.map((route: IRouteConfig) => {
      if (route.private) {
        return (
          <PrivateRoute
            key={route.key}
            component={route.component}
            path={route.path}
            exact={route.exact}
          />
        );
      }
      return (
        <Route key={route.key} path={route.path} exact={route.exact}>
          <Page component={route.component} />
        </Route>
      );
    })}

    <Route component={Page404} />
  </Switch>
);
