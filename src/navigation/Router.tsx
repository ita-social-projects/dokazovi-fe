import React from 'react';
import { Route, Switch } from "react-router-dom";
import { IRouterConfig } from "./types";

export const RenderRoutes: React.FC<{ routes: IRouterConfig[] }> = ({routes}) => {
    return (        
        <Switch>           
            {routes.map((route, i) => {
              return <RouteWithSubRoutes                        
                        {...route}
              />;
        })}
            <Route component={() => <h1>Not Found!</h1>} />
        </Switch>
        
    )
}


export const RouteWithSubRoutes: React.FC<IRouterConfig> = (route) => {
  if (route.routes) {
    return (      
      <Route
        path={route.path}
        exact={route.exact}        
        render={props => <route.component {...props} routes={route.routes!} />}
      />
    );
    }
    else {
      return (
      <Route
        path={route.path}
        exact={route.exact}  
        component={route.component}   
      />
    );
    }
  }