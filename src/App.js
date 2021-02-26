import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { handleLogin } from './actions/index';
import Login from './pages/Login';
import Wallet from './pages/Wallet';

function App() {
  return (
    <Switch>
      <Route path="/carteira" component={ Wallet } />
      <Route exact path="/" handleLogin component={ Login } />
    </Switch>
  );
}

const mapDispatchToProps = (dispatch) => ({
  handleLogin: (userEmail) => dispatch(handleLogin(userEmail)),
});

export default connect(mapDispatchToProps)(App);
