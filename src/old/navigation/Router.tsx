import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch, Redirect, useLocation } from 'react-router-dom';
import {
  IRouteConfig,
  ITransformPathnameConfig,
  IVirtualHistory,
  IVirtualHistoryRecord,
} from './types';
import Page from '../lib/components/Pages/Page';
import Page404 from '../lib/components/Errors/Page404';
import { LoadingStatusEnum } from '../lib/types';
import { LoadingContainer } from '../lib/components/Loading/LoadingContainer';
import { selectCurrentUser } from '../../models/user/selectors';
import { useVirtualHistory } from '../lib/hooks/useVirtualHistory';

const PrivateRoute: React.FC<IRouteConfig> = ({ path, exact, component }) => {
  const user = useSelector(selectCurrentUser);

  if (
    user.loading === LoadingStatusEnum.idle ||
    user.loading === LoadingStatusEnum.pending
  ) {
    return (
      <Page
        component={() => <LoadingContainer loading={user.loading} expand />}
      />
    );
  }

  if (!user.data) {
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
}) => {
  const location = useLocation();
  const sessionKey = 'vt-history';

  useVirtualHistory(sessionKey, [{}] as ITransformPathnameConfig[]);
  return (
    <>
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
        <Route>
          <Page component={Page404} />
        </Route>
      </Switch>
    </>
  );
};
