import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import { IRouteConfig } from './types';
import Page from '../lib/components/Pages/Page';
import Page404 from '../lib/components/Errors/Page404';
import { LoadingStatusEnum } from '../lib/types';
import LoadingContainer from '../lib/components/Loading/LoadingContainer';
import { Header } from '../lib/components/Header/Header';
import { Footer } from '../lib/components/Footer/Footer';
import { selectCurrentUser } from '../store/user/selectors';

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
}) => (
  <>
    <Header />
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
      <Route component={Page404} />
    </Switch>
    <Footer />
  </>
);
