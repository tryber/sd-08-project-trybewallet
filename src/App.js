import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Login from './pages/Login';
import Wallet from './pages/Wallet';

import store from './store/'

function App() {
  return (
    <Provider store={ store }>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route path="/carteira" component={ Wallet } />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
