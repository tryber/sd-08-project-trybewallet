import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Wallet from './pages/Wallet';

// The development of this project have followed,
// together with Trybe's content, the "plantão" offered by Paulo Simões:
// https://github.com/plantao-de-alunos-trybe/plantao-trybe-wallet-live-code/tree/4a7ae1149586567fe744a61214735927bdb72094
// And I've also been kindly helped by Isabella Paz and Rosiele David,
// God bless them all.

class App extends React.Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/carteira" component={ Wallet } />
          <Route exact path="/" component={ Login } />
        </Switch>
      </div>
    );
  }
}

export default App;
