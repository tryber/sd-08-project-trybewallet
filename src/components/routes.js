import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../pages/Login';
import NotFound from '../pages/404';
import Wallet from '../pages/Wallet';

export default class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route path="/carteira" component={ Wallet } />
        <Route exact path="/" component={ Login } />
        <Route component={ NotFound } />
      </Switch>
    );
  }
}
