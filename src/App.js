import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from './pages/Login/Login';
import Wallet from './pages/Wallet/Wallet';

function App() {
  return (
    <Switch>
      <Route path="/carteira">
        <Wallet />
      </Route>
      <Route path="/">
        <Login />
      </Route>
    </Switch>
  );
}

export default App;
