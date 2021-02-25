import React from 'react';
import { Route, Switch } from 'react-router-dom';
import walletimg from './img/walletimg.png';
import Login from './pages/Login';
import Wallet from './pages/Wallet';

function App() {
  return (
    <div>
      <img src={ walletimg } alt="Wallet Logo" />
      <Switch>
        <Route path="/carteira" component={ Wallet } />
        <Route exact path="/" component={ Login } />
      </Switch>
    </div>
  );
}

export default App;
