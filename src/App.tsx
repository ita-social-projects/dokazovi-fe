import React, { Suspense, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import {
  CircularProgress,
  CssBaseline,
  ThemeProvider,
} from '@material-ui/core';
import { ROUTER_CONFIG } from './old/navigation/router-config';
import { RenderRoutes } from './old/navigation/Router';
import {
  fetchDirections,
  fetchPostsTypes,
  fetchRegions,
} from './old/store/propertiesSlice';
import { AuthProvider } from './old/provider/AuthProvider/AuthProvider';
import { MAIN_THEME } from './old/lib/theme/theme';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'react-toastify/dist/ReactToastify.min.css';

export const App: React.FC = () => {
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
