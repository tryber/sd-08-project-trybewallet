import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from './pages/Login';
import Wallet from './pages/Wallet';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/carteira" component={ Wallet } />
      </Switch>
    </BrowserRouter>
  );
}

const mapDispatchToProps = (dispatch) => ({
  handleLogin: (userEmail) => dispatch(handleLogin(userEmail)),
});

export default connect(mapDispatchToProps)(App);
