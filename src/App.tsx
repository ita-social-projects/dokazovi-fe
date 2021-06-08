import React, { Suspense, useEffect } from 'react';
import ReactGA from 'react-ga';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import {
  CircularProgress,
  CssBaseline,
  ThemeProvider,
} from '@material-ui/core';
import { ROUTER_CONFIG } from './old/navigation/router-config';
import { RenderRoutes } from './old/navigation/Router';
import { AuthProvider } from './old/provider/AuthProvider/AuthProvider';
import { MAIN_THEME } from './old/lib/theme/theme';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'react-toastify/dist/ReactToastify.min.css';
import {
  fetchDirections,
  fetchOrigins,
  fetchPostsTypes,
  fetchRegions,
} from './models/properties';
import { useActions } from './shared/hooks';

ReactGA.initialize(process.env.REACT_APP_GOOGLE_ID as string, {
  testMode: process.env.NODE_ENV === 'test',
});

export const App: React.FC = () => {
  const [
    boundFetchDirections,
    boundFetchOrigins,
    boundFetchPostsTypes,
    boundFetchRegions,
  ] = useActions([
    fetchDirections,
    fetchOrigins,
    fetchPostsTypes,
    fetchRegions,
  ]);

  useEffect(() => {
    const fetchProperties = () => {
      boundFetchDirections();
      boundFetchOrigins();
      boundFetchPostsTypes();
      boundFetchRegions();
    };
    fetchProperties();
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
          <div className="content">
            <Suspense fallback={<CircularProgress className="mainLoading" />}>
              <AuthProvider>
                <RenderRoutes routes={ROUTER_CONFIG} />
              </AuthProvider>
            </Suspense>
          </div>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
};
