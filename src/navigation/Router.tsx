import React from "react";
import {
  Route, Switch
} from "react-router-dom";
import { IRouterConfig } from "./types";

export const RouteWithSubRoutes: React.FC<IRouterConfig> = (route: IRouterConfig) => {
  if (route.routes) {
    return (
      <Route path={route.path} exact={route.exact}
        render={props => (<route.component {...props} routes={route.routes!}></route.component>)}></Route>
    )
  } else return (
    <Route path={route.path} exact={route.exact} component={route.component}>
    </Route>
  )
}

export const RenderRoutes: React.FC<{ routes: IRouterConfig[]; }> = (route: { routes: IRouterConfig[] }) => {
  return (
    <Switch>
      {route.routes.map((route: IRouterConfig) => {
        return <RouteWithSubRoutes key={route.key} {...route} />;
      })}
      <Route component={() => <h1>Not Found!</h1>} />
    </Switch>
  );
}

