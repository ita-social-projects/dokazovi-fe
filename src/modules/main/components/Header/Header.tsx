import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";

import './Header.css';

import MainView from '../MainView';
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
          <li><Link to="/covid-19">Covid-19</Link></li>
          <li><Link to="/напрямки">Напрямки</Link></li>
          <li><Link to="/експерти">Експерти</Link></li>
          <li><Link to="/переклади">Переклади</Link></li>
          <li><Link to="/навчання">Навчання</Link></li>
        </ul>

        <Switch>
          <Route exact path="/" component={MainView}/>
          <Route path="/covid-19" component={DirectionView}/>
          <Route path="/напрямки"/>
          <Route path="/експерти"/>
          <Route path="/переклади"/>
          <Route path="/навчання"/>
        </Switch>
      </div>
    </div>
  );
}

export default Header;
