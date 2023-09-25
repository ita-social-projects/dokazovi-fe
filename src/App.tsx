import React, { Suspense, useEffect } from 'react';
import ReactGA from 'react-ga';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import {
  CircularProgress,
  CssBaseline,
  ThemeProvider,
} from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { MAIN_THEME } from 'styles/theme';
import {
  ROUTER_CONFIG,
  ADMIN_ROUTER_CONFIG,
} from './old/navigation/router-config';
import { RenderRoutes } from './old/navigation/Router';
import { AuthProvider } from './old/provider/AuthProvider/AuthProvider';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'react-toastify/dist/ReactToastify.min.css';
import {
  fetchCities,
  fetchDirections,
  fetchOrigins,
  fetchPostsTypes,
  fetchRegions,
} from './models/properties';
import { useActions } from './shared/hooks';
import { Header } from './components/Header/Header';
import { Footer } from './old/lib/components/Footer/Footer';
import {
  BreadcrumbsProvider,
  breadcrumbsConfigs,
} from './components/Breadcrumbs';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import { getAuthoritiesAsyncAction } from './models/authorities';
import { ScreenProvider } from './old/provider/MobileProvider/ScreenProvider';

ReactGA.initialize(process.env.REACT_APP_GOOGLE_ID as string, {
  testMode: process.env.NODE_ENV === 'test',
});

export const App: React.FC = () => {
  const [
    boundFetchDirections,
    boundFetchOrigins,
    boundFetchPostsTypes,
    boundFetchRegions,
    boundFetchCities,
    boundAuthorities,
  ] = useActions([
    fetchDirections,
    fetchOrigins,
    fetchPostsTypes,
    fetchRegions,
    fetchCities,
    getAuthoritiesAsyncAction,
  ]);

  useEffect(() => {
    const fetchProperties = () => {
      boundAuthorities();
      boundFetchDirections();
      boundFetchOrigins();
      boundFetchPostsTypes();
      boundFetchRegions();
      boundFetchCities();
    };
    fetchProperties();
    if (!localStorage.getItem('lang')) localStorage.setItem('lang', 'uk');
  }, []);

  return (
    <div className="App">
      <ThemeProvider theme={MAIN_THEME}>
        <ToastContainer
          position="bottom-right"
          limit={3}
          draggable={false}
          hideProgressBar
          closeOnClick={false}
          autoClose={4000}
        />
        <CssBaseline />
        <BrowserRouter>
          <ScrollToTop />
          <div className="content">
            <AuthProvider>
              <ScreenProvider>
                <BreadcrumbsProvider configs={breadcrumbsConfigs}>
                  <Header />
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Suspense
                      fallback={
                        <div className="mainLoading">
                          <CircularProgress />
                        </div>
                      }
                    >
                      <RenderRoutes
                        routes={ROUTER_CONFIG}
                        adminRouterConfig={ADMIN_ROUTER_CONFIG}
                      />
                    </Suspense>
                  </MuiPickersUtilsProvider>
                  <Footer />
                </BreadcrumbsProvider>
              </ScreenProvider>
            </AuthProvider>
          </div>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
};
