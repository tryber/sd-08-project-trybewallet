import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Wallet from './pages/Wallet';

function App() {
  return (
    <Switch>
      <main>
        <Route exact path="/" component={ Login } />
        <Route path="/carteira" component={ Wallet } />
      </main>
    </Switch>
  );
}

export default App;
