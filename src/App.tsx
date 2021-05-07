import React, { Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import {
  CircularProgress,
  CssBaseline,
  ThemeProvider,
} from '@material-ui/core';

import { RenderRoutes } from './old/navigation/Router';
import ROUTER_CONFIG from './old/navigation/router-config';
import Header from './old/lib/components/Header/Header';
import { Footer } from './old/lib/components/Footer/Footer';
import {
  fetchDirections,
  fetchPostsTypes,
  fetchRegions,
  fetchOrigins,
} from './old/store/propertiesSlice';
import { RootStateType } from './old/store/rootReducer';
import { loginUser } from './old/store/authSlice';
import { LocalStorageKeys } from './old/lib/types';
import { MAIN_THEME } from './old/lib/theme/theme';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'react-toastify/dist/ReactToastify.min.css';

export const App: React.FC = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootStateType) => state.currentUser);

  useEffect(() => {
    const fetchProperties = () => {
      dispatch(fetchPostsTypes());
      dispatch(fetchRegions());
      dispatch(fetchDirections());
      dispatch(fetchOrigins());
    };
    fetchProperties();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem(LocalStorageKeys.ACCESS_TOKEN);
    if (!user && token) {
      dispatch(loginUser());
    }
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
            <Header />
            <Suspense fallback={<CircularProgress className="mainLoading" />}>
              <RenderRoutes routes={ROUTER_CONFIG} />
            </Suspense>
          </div>
          <Footer />
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
};
