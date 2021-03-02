import React from 'react';
import { Route, Switch } from 'react-router';
import { Login, Wallet } from './pages';
import './App.css';

function App() {
  return (
    <Switch>
      <Route path="/carteira" component={ Wallet } />
      <Route path="/" component={ Login } />
    </Switch>
  );
}

export default App;
