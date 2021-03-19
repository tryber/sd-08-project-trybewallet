import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Wallet from './pages/Wallet';

// Erik e Rodolfo me ajudaram :)

function App() {
  return (
    <Switch>
      <Route path="/carteira" component={ Wallet } />
      <Route exact path="/" component={ Login } />
    </Switch>
  );
}

export default App;
