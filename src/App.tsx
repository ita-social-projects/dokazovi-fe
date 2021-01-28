import React, { Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';
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

const App: React.FC = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootStateType) => state.currentUser);

  const fetchProperties = () => {
    dispatch(fetchPostsTypes());
    dispatch(fetchRegions());
    dispatch(fetchDirections());
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  useEffect(() => {
    const isToken = localStorage.getItem('ACCESS_TOKEN');

    if (!user && isToken) {
      dispatch(loginUser());
    }
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Suspense fallback={<CircularProgress className="mainLoading" />}>
          <RenderRoutes routes={ROUTER_CONFIG} />
        </Suspense>
      </BrowserRouter>
    </div>
  );
};

export default App;
