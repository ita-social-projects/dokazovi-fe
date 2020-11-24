import React, { Suspense } from 'react';
import './App.css';
import { RenderRoutes } from './navigation/Router';
import ROUTER_CONFIG from './navigation/router-config';

import Header from './lib/components/Header/Header';


const App: React.FC  = () => {

  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <div className="App">
        <Header />
        <RenderRoutes routes={ROUTER_CONFIG} />
      </div>
    </Suspense>
  );
};

export default App;
