import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import './App.css';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={ Login } />
      </Switch>
    </div>
  );
}

export default App;
