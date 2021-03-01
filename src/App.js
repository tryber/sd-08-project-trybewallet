import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Wallet from './pages/Wallet';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/carteira" component={ Wallet } />
        {/* <Route path="/login" component={Login} /> */}
        {/* <Route path="/customers" component={Customers} /> */}
        {/* <Route path="/register-customers" component={RegisterCustomers} /> */}
      </Switch>
    </div>
  );
}

export default App;
