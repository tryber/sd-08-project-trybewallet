import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import './App.css';
import Wallet from './pages/Wallet';

function App() {
  function disclaimer() {
    return (
      <header>
        <h1 style={ { color: 'red', textAlign: 'center' } }>
          Putz, peço perdão pelo vacilo!
        </h1>
      </header>);
  }
  return (
    <section>
      <nav className="navBar">
        <Link to="/">Login</Link>
        <Link to="/carteira">Carteira</Link>
      </nav>
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGpR3dAmVnJ6RLewlilzUOjUYKAR7_VX0xMA&usqp=CAU"
        alt="perdao-pelo-vacilo"
        className="App-logo"
      />
      <h1 className="App">Hello, TrybeWallet!</h1>
      {disclaimer()}
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/carteira" component={ Wallet } />
      </Switch>
    </section>
  );
}

export default App;
