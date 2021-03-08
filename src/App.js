import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Wallet from './pages/Wallet';

function App() {
  return (
    <Switch>
      <Route path="/carteira" component={ Wallet } />
      <Route path="/" exact component={ Login } />
    </Switch>
  );
}

export default App;
/* Projeto realizado na turma7, porém tive alguns impedimentos pois a forma que havia desevolvido
não correspondia a que foi exigido pela nova versão EsLint, de acordo com a nova exigencia não poderiam haver dentro de uma função
mais de 50, pequsisei como havia sido feito em repositórios de colegas e percebi que haviam feitos 3 compontes para o arquivo Wallet,
para execusão deste projeto utilizei das lives codes realizadas na turma 8 e a pesuisa feita no repósitório:
https://github.com/tryber/sd-08-project-trybewallet/tree/igorln-project-trybewallet
 */
