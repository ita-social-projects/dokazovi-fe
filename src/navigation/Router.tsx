import React from "react";
import { Route, Switch } from "react-router-dom";
import { IRouterConfig } from "./types";

export const RouteWithSubRoutes: React.FC<IRouterConfig> = (
  route: IRouterConfig,
) => {
  const { routes } = route;
  if (routes === undefined) {
    return (
      <Route
        path={route.path}
        exact={route.exact}
        component={route.component}
      />
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
  return (
    <Switch>
      {routes.routes.map((route: IRouterConfig) => {
        return (
          <RouteWithSubRoutes
            key={route.key}
            component={route.component}
            path={route.path}
          />
        );
      })}
      <Route component={() => <h1>Not Found!</h1>} />
    </Switch>
  );
};
