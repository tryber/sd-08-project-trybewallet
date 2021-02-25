import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import './index.css';
import { Provider } from 'react-redux';
import App from './App';
import * as serviceWorker from './serviceWorker';
import store from './store';
import Wallet from './pages/Wallet';

ReactDOM.render(
  <Provider store={ store }>
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={ App } />
        <Route path="/carteira" exact component={ Wallet } />
        <Redirect from="*" to="/" />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
