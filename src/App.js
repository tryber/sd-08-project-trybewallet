import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Wallet from './pages/Wallet';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' component={Login}></Route>
        <Route path='/carteira' component={Wallet}></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
