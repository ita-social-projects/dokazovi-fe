import React from 'react';
import './App.css';
import logo from './logo.svg';
import { RenderRoutes } from './navigation/Router'
import { ROUTER_CONFIG } from './navigation/routerConfig'


function App() {
  return (
    <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <p>
        Edit <code>src/App.tsx</code> and save to reload.
      </p>
      <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
      </a>
    </header>
    <RenderRoutes routes={ROUTER_CONFIG} />
  </div>
  );
}

export default App;
