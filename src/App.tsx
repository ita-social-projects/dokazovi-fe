import React, { Suspense, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import {
  CircularProgress,
  CssBaseline,
  ThemeProvider,
} from '@material-ui/core';
import { RenderRoutes } from './navigation/Router';
import { ROUTER_CONFIG } from './navigation/router-config';
import {
  fetchDirections,
  fetchPostsTypes,
  fetchRegions,
} from './store/propertiesSlice';
import { AuthProvider } from './authProvider/AuthProvider';
import { MAIN_THEME } from './lib/theme/theme';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const App: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProperties = () => {
      dispatch(fetchPostsTypes());
      dispatch(fetchRegions());
      dispatch(fetchDirections());
    };
    fetchProperties();
  }, []);

  return (
    <div className="App">
      <ThemeProvider theme={MAIN_THEME}>
        <SnackbarProvider
          maxSnack={4}
          autoHideDuration={4000}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
        >
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
        </SnackbarProvider>
      </ThemeProvider>
    </div>
  );
};

export default App;
