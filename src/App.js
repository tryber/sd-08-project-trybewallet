import React from 'react';
import { Route } from 'react-router-dom';
import Login from './pages/Login';
import Wallet from './pages/Wallet';

function App() {
  return (
    <>
      <Route exact path="/carteira">
        <Wallet />
      </Route>
      <Route exact path="/">
        <Login />
      </Route>
    </>
  );
}

export default App;
