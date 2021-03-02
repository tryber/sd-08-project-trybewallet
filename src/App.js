import React from 'react';
import PropTypes from 'prop-types';
import {
  Route,
  Switch,
} from 'react-router-dom';
import {
  Login,
  Wallet,
} from './pages';

function App(props) {
  return (
    <Switch>
      <Route exact path="/" render={ () => <Login /> } />
      <Route path="/carteira" render={ () => <Wallet /> } />
    </Switch>
  );
}

export default App;
