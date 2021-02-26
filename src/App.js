import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Wallet from './pages/Wallet';

function App() {
  return (
    <Switch>
      <Route path="/" exact component={ Login } />
      <Route path="/carteira" exact component={ Wallet } />
    </Switch>
  );
}

export default App;
