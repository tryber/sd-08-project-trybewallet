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
          Hello Wallet Demon!
        </h1>
      </header>);
  }
  return (
    <section>
      <nav className="navBar">
        <Link to="/">Login</Link>
        <Link to="/carteira">Carteira</Link>
      </nav>
      {/* <img src="https://www.dicionarioinformal.com.br/image/c/47.jpg" alt="little-devil" className="App-logo" />
      <h1 className="App">Hello, TrybeWallet!</h1>
      {disclaimer()} */}
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/carteira" component={ Wallet } />
      </Switch>
    </section>
  );
}

export default App;
