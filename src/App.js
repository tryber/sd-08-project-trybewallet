import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';

function App() {
  return (
    <div>
      <div>Hello, TrybeWallet!</div>
      <Switch>
        <Route exact path="/" component={ Login } />
      </Switch>
    </div>
  );
}

export default App;
