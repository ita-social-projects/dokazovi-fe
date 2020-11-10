import React from 'react';
import {
  Switch,
  Route,
  Link,
} from "react-router-dom";

import './Header.css';

import DirectionView from "../../../direction/components/DirectionView";


function Header() {
  return (
    <div className="header">

      <div className="general">
        <div className="logo">  
          <img src="#" alt="logo" className="logo-img"/>
        </div>
        <div className="log-in">
          <img src="#" alt="user" className="img-log-in"/>
          <button type="button">Log in</button>
          <button type="button">Register</button>
        </div>  
      </div>

      <div className="navigation">
        <ul className="nav-list">
          <li><Link to="/">Головна</Link></li>
          <li><Link to="/direction/covid-19">Covid-19</Link></li>
          <li>Напрямки</li>
          <li>Експерти</li>
          <li>Переклади</li>
          <li>Навчання</li>
        </ul>

        <Switch>
          <Route path="/covid-19" component={DirectionView}/>
          <Route path="#"/>
          <Route path="#"/>
          <Route path="#"/>
          <Route path="#"/>
        </Switch>
      </div>
    </div>
  );
}

export default Header;
