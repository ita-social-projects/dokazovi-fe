import React, { Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import {
  CircularProgress,
  Container,
  CssBaseline,
  ThemeProvider,
} from '@material-ui/core';
import { RenderRoutes } from './navigation/Router';
import ROUTER_CONFIG from './navigation/router-config';
import Header from './lib/components/Header/Header';
import {
  fetchDirections,
  fetchPostsTypes,
  fetchRegions,
} from './store/propertiesSlice';
import { RootStateType } from './store/rootReducer';
import { loginUser } from './store/authSlice';
import { LocalStorageKeys } from './lib/types';
import { MAIN_THEME } from './lib/theme/theme';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootStateType) => state.currentUser);

  useEffect(() => {
    const fetchProperties = () => {
      dispatch(fetchPostsTypes());
      dispatch(fetchRegions());
      dispatch(fetchDirections());
    };
    fetchProperties();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem(LocalStorageKeys.ACCESS_TOKEN);
    if (!user && token) {
      dispatch(loginUser());
    }
  }, [user]);

  return (
    <div className="App">
      <ThemeProvider theme={MAIN_THEME}>
        <CssBaseline />

        <BrowserRouter>
          <Container>
            <Header />
            <Suspense fallback={<CircularProgress className="mainLoading" />}>
              <RenderRoutes routes={ROUTER_CONFIG} />
            </Suspense>
          </Container>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
};

export default App;
