import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Wallet from './pages/Wallet';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="app">
        <BrowserRouter>
          <Switch>
            <Route path="/carteira" component={ Wallet } />
            <Route exact path="/" component={ Login } />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
