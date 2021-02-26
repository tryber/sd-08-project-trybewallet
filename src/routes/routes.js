import { Route, Switch } from 'react-router-dom';
import React from 'react';
import Login from '../pages/Login';
import Wallet from '../pages/Wallet';

const Routes = () => (
  <Switch>
    <Route path="/" exact component={ Login } />
    <Route path="/carteira" exact component={ Wallet } />
  </Switch>
);
export default Routes;
