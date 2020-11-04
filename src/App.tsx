import React from 'react';
import './App.css';
import { RenderRoutes } from "./navigation/Router"; 
import { ROUTER_CONFIG } from "./navigation/routerConfig"; 


function App() {
  
  return (    
    <div className="App">
      <header className="App-header"> 
      <h1>Header</h1>     
      </header>      
      <RenderRoutes routes={ROUTER_CONFIG}/>  
    </div>    
  );
}

export default App;
