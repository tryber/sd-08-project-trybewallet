import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import Login from './pages/Login'
import Wallet from './pages/Wallet'

import store from './store/'

function App() {
  return (
    <Provider store={ store }>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route path="/carteira">
            <Wallet />
          </Route>
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
