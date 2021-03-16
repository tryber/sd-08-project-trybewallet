import React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import Login from './pages/Login';
import Wallet from './pages/Wallet';

import store from './store';

function App() {
  return (
    <Provider store={ store }>
      <Router>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/carteira" component={ Wallet } />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
