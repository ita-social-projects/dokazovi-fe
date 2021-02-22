import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PageTitleComponent from '../lib/components/PageTitleComponent';
import { IRouterConfig } from './types';
import { RootStateType } from '../store/rootReducer';

const PrivateRouteWithSubRoutes: React.FC<IRouterConfig> = (props) => {
  const { user } = useSelector((state: RootStateType) => state.currentUser);
  const { routes, path, exact, title, component } = props;

  if (!user) {
    return <Redirect to="/" />;
  }
  return (
    <RouteWithSubRoutes
      component={component}
      path={path}
      routes={routes}
      exact={exact}
      title={title}
    />
  );
};

export const RouteWithSubRoutes: React.FC<IRouterConfig> = (props) => {
  const { routes, path, exact, title } = props;

  if (!routes) {
    const routeWithoutRoutes = props;
    return (
      <Route path={path} exact={exact}>
        <>
          <PageTitleComponent title={title} />
          <routeWithoutRoutes.component />
        </>
      </Route>
    );
  }
  return (
    <Route path={path} exact={exact}>
      <>
        <PageTitleComponent title={title} />
        <props.component routes={routes} />
      </>
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
                title={route.title}
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
              title={route.title}
            />
          );
        })}
        <Route component={() => <h1>Not Found!</h1>} />
      </Switch>
    );
  }

  return <Route component={() => <h1>Not Found!</h1>} />;
};
