import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';

import './App.css';

function App() {
  return (
    <Switch>
      <Route path="/" exact component={ Login } />
    </Switch>
  );
}

export default App;
