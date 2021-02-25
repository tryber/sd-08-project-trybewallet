import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Login from './pages/Login';
import Wallet from './pages/Wallet';

import './styles/global.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/carteira" component={ Wallet } />
        <Route path="/" component={ Login } />
      </Switch>
    </Router>
  );
}

export default App;
