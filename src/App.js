import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from './pages/Login';
import Wallet from './pages/Wallet';

import './styles/global.css';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/carteira" component={ Wallet } />
    </Switch>
  );
}

export default App;
