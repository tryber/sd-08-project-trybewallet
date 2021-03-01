import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from './pages/Login';

import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Trybe Wallet</h1>
      <Switch>
        <Route path="/" component={ Login } />
      </Switch>
    </div>
  );
}

export default App;
