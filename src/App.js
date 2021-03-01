import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Login, Wallet } from './pages';
import './App.css';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/carteira" component={ Wallet } />
      </Switch>
      <div className="link-freepik-best-icons">
        Icons made by&nbsp;
        <a href="https://www.freepik.com" title="Freepik">Freepik</a>
        &nbsp;from&nbsp;
        <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>
      </div>
    </div>
  );
}

export default App;
