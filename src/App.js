import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Wallet from './pages/Wallet';

function App() {
  return (
    <div>
      <div>Hello, TrybeWallet!</div>
      <Switch>
        <Route
          exact
          path="/"
          render={ (props) => (
            <Login
              { ...props }
            />
          ) }
        />
        <Route
          path="/carteira"
          render={ (props) => (
            <Wallet
              { ...props }
            />
          ) }
        />
      </Switch>

    </div>
  );
}

export default App;
