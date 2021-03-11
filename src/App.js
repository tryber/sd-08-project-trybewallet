// o projeto todo foi feito acompanhando um plantão guiado pelo colega Paulo Simões

import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from './pages/Login';
import Wallet from './pages/Wallet';

import './styles/global.css';

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/carteira" component={ Wallet } />
          <Route path="/" component={ Login } />
        </Switch>
      </div>
    );
  }
}

export default App;
