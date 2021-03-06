import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Wallet from './pages/Wallet';

function App() {
  return (
    <main>
      <Switch>
        <Route strict path="/Login" component={ Login } />
        <Route strict path="/carteira" component={ Wallet } />
        <Route strict path="/" component={ Login } />
      </Switch>
    </main>
  );
}

export default App;
