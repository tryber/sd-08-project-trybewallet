import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from './pages/Login';
import Wallet from './pages/Wallet';

import './App.css';

function App() {
  return (
    <main>
      <Switch>
        <Route path="/carteira" component={ Wallet } />
        <Route path="/" component={ Login } />
      </Switch>
    </main>
  );
}

export default App;
