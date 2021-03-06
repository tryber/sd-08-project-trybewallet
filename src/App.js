import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import wallet from './reducers/wallet';

function App() {
  return (
    <Switch>
      <Route path="/carteira" component={ wallet } />
      <Route exact path="/" component={ Login } />
    </Switch>
  );
}

export default App;
