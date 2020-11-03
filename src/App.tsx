import React from 'react';
import './App.css';
import {BrowserRouter} from 'react-router-dom'

import Router from "./navigation/Router"; 

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <header className="App-header">      
      </header>
      
      <Router /> {/*router component*/} 
    </div>
    </BrowserRouter>
  );
}

export default App;
