import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Wallet from './pages/Wallet';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/carteira" component={ Wallet } />
    </Switch>
  );
}

export default App;

// Outra coisa importante: devido a estrutura que o avaliador utiliza para realizar os testes, 
// é **necessário** que o seu `<Provider />` e o seu `<BrowserRouter />` estejam no arquivo `index.js` 
// e **não** no `<App />`.
// estado global:
// {
//   user: {
//     email: '',
//   },
//   wallet: {
//     currencies: [],
//     expenses: []
//   }
// }
