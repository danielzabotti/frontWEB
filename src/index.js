import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './pages/Home/Home';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/" exact={true} component={Home} />
    </Switch>
  </BrowserRouter>
  , document.getElementById('root')
);
registerServiceWorker();
