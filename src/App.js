import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import logo from './logo.svg';
import './App.css';
import Wallet from './pages/Wallet';

function App() {
  return (
    <section>
      <nav className="navBar">
        <Link to="/">Login</Link>
        <Link to="/carteira">Carteira</Link>
      </nav>
      <img src={ logo } alt="logo" className="App-logo" />
      <h1>Hello, TrybeWallet!</h1>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/carteira" component={ Wallet } />
      </Switch>
    </section>
  );
}

export default App;
