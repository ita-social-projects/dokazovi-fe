import React from "react";
import {
  Route, Switch
} from "react-router-dom";

// todo discuss is it okay?
interface ExtendedRoute {
  routes: ExtendedRoute[];
  path: string | string[];
  exact: boolean;
  component: React.ComponentClass<{
    routes: ExtendedRoute[];
  }>;
}

function RouteWithSubRoutes(route: ExtendedRoute) {
  return (
    <Route path={route.path} exact={route.exact}
      render={props => (<route.component {...props} routes={route.routes}></route.component>)}
    >
    </Route>
  );
}

export function RenderRoutes({ routes }) {
  return (
    <Switch>
      {routes.map((route: JSX.IntrinsicAttributes & ExtendedRoute) => {
        return <RouteWithSubRoutes key={route.key} {...route} />;
      })}
      <Route component={() => <h1>Not Found!</h1>} />
    </Switch>
  );
}
