import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IRouterConfig } from './types';
import { RootStateType } from '../store/rootReducer';
import Page from '../lib/components/Pages/Page';
import Page404 from '../lib/components/Errors/Page404';

const PrivateRouteWithSubRoutes: React.FC<IRouterConfig> = (props) => {
  const { user } = useSelector((state: RootStateType) => state.currentUser);
  const { routes, path, exact, component } = props;

  if (!user) {
    return <Redirect to="/" />;
  }
  return (
    <RouteWithSubRoutes
      component={component}
      path={path}
      routes={routes}
      exact={exact}
    />
  );
};

export const RouteWithSubRoutes: React.FC<IRouterConfig> = (props) => {
  const { routes, path, exact } = props;

  if (!routes) {
    const routeWithoutRoutes = props;
    return (
      <Route path={path} exact={exact}>
        <Page component={routeWithoutRoutes.component} />
      </Route>
    );
  }
  return (
    <Route path={path} exact={exact}>
      <props.component routes={routes} />
    </Route>
  );
};

export const RenderRoutes: React.FC<{ routes?: IRouterConfig[] }> = (props) => {
  const { routes } = props;

  if (routes) {
    return (
      <Switch>
        {routes.map((route: IRouterConfig) => {
          if (route.private) {
            return (
              <PrivateRouteWithSubRoutes
                key={route.key}
                component={route.component}
                path={route.path}
                routes={route.routes}
                exact={route.exact}
              />
            );
          }
          return (
            <RouteWithSubRoutes
              key={route.key}
              component={route.component}
              path={route.path}
              routes={route.routes}
              exact={route.exact}
            />
          );
        })}
        <Route component={Page404} />
      </Switch>
    );
  }

  return <Route component={Page404} />;
};
