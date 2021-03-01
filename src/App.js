import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Login, Wallet } from './pages';

function App() {
  return (
    <div>
      Hello, TrybeWallet!
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/wallet" component={ Wallet } />
      </Switch>
    </div>
  );
}

export default App;
