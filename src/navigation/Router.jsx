import React from 'react';
import { Route, Switch } from "react-router-dom";
import {ROUTER_CONFIG} from './routerConfig'

export default function Router () {
    return (
        
        <Switch>           
            {ROUTER_CONFIG.map(route => (
              <Route 
              key={route.path}
              path={route.path}
              component={route.component}
              />
            ))}
        </Switch>
        
    )
}