import React from "react";
import { Route, Switch } from "react-router-dom";
import { IRouterConfig, IRouterConfigWithoutRoutes } from "./types";

export const RouteWithSubRoutes: React.FC<IRouterConfig> = (
  route: IRouterConfig,
) => {
  const { routes } = route;
  if (routes === undefined) {
    const routeWithoutRoutes = route as IRouterConfigWithoutRoutes;
    return (
      <Route path={route.path} exact={route.exact}>
        <routeWithoutRoutes.component />
      </Route>
    );
  }
  return (
    <Route
      path={route.path}
      exact={route.exact}
      render={() => <route.component routes={routes} />}
    />
  );
};

export const RenderRoutes: React.FC<{ routes: IRouterConfig[] }> = (routes: {
  routes: IRouterConfig[];
}) => {
  const allRoutes = routes.routes;
  return (
    <Switch>
      {allRoutes.map((route: IRouterConfig) => {
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
      <Route component={() => <h1>Not Found!</h1>} />
    </Switch>
  );
};
