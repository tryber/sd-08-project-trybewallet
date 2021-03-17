import React from 'react';
import { Route } from 'react-router-dom';
import Wallet from './pages/Wallet';
import Login from './pages/Login';
import './App.css';

function App() {
  return (
    <Route>
      <Route path="/carteira" component={ Wallet } />
      <Route exact path="/" component={ Login } />
    </Route>
  );
}

export default App;
