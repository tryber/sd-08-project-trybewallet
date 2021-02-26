import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Wallet from './pages/Wallet';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/" exact render={ (props) => <Login { ...props } /> } />
        <Route path="/carteira" exact render={ (props) => <Wallet { ...props } /> } />
      </Switch>

    );
  }
}

export default App;
