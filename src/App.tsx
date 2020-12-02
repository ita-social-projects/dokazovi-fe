import React, { Suspense } from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { RenderRoutes } from './navigation/Router';
import ROUTER_CONFIG from './navigation/router-config';

import Header from './lib/components/Header/Header';


const App: React.FC = () => {

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
