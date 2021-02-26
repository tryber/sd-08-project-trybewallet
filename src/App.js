import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Wallet from './pages/Wallet';

function App() {
  return (
    <div>
      <h3>Hello, TrybeWallet!</h3>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="carteira" component={ Wallet } />
      </Switch>
    </div>
  );
}

export default App;
