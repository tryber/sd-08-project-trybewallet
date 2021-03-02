import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { Login, Wallet } from './pages';

const Routes = () => (
  <Switch>
    <Route path="/" component={ Login } exact />
    <Route path="/carteira" component={ Wallet } />
  </Switch>
);

export default Routes;
