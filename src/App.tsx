import React, { Suspense, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { RenderRoutes } from './navigation/Router';
import ROUTER_CONFIG from './navigation/router-config';

import Header from './lib/components/Header/Header';
import { fetchPostsTypes, fetchRegions } from './store/propertiesSlice';

const App: React.FC = () => {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(fetchPostsTypes());
  // }, [dispatch]);

  const fetchProperties = () => {
    dispatch(fetchPostsTypes());
    dispatch(fetchRegions());
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Suspense fallback={<div>Загрузка...</div>}>
          <RenderRoutes routes={ROUTER_CONFIG} />
        </Suspense>
      </BrowserRouter>
    </div>
  );
};

export default App;
