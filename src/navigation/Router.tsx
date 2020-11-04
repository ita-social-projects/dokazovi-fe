import React from 'react';
import { Route, Switch } from "react-router-dom";
import { IRouterConfig } from "./types";

export function RenderRoutes ({routes}) {
    return (        
        <Switch>           
            {routes.map((route, i) => {
              return <RouteWithSubRoutes 
                        key={route.key}
                        {...route}
              />;
        })}
            <Route component={() => <h1>Not Found!</h1>} />
        </Switch>
        
    )
}

function RouteWithSubRoutes(route: IRouterConfig) {
    return (      
      <Route
        path={route.path}
        exact={route.exact}        
        render={props => <route.component {...props} routes={route.routes} />}
      />
    );
  }