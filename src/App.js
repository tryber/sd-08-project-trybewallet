import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Login, Wallet } from './pages';
import './App.css';

function App() {
  return (
    <Switch>
      <Route path="/carteira" component={ Wallet } />
      <Route exact path="/" component={ Login } />
    </Switch>
  );
}

export default App;
