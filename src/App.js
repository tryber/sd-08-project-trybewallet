import React from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from './redux/store';

import Login from './pages/Login';
import Wallet from './pages/Wallet';

import './App.css';

class App extends React.Component {
  render() {
    return (
      <Provider store={ store }>
        <Router>
          <Switch>
            <Route exact path="/" component={ Login } />
            <Route path="/carteira" component={ Wallet } />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
