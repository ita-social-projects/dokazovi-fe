import React from 'react';
import './App.css';
// import {Router} from './navigation/router'
import {RenderRoutes} from './navigation/Router'
import {ROUTER_CONFIG} from './navigation/routerConfig'


function App() {
  return (
    <RenderRoutes routes={ROUTER_CONFIG}/>  
  );
}

export default App;
