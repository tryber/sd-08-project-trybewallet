import React from 'react';
import Header from '../components/Header';
import FormWallet from '../components/FormWallet';

export default class Wallet extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <FormWallet />
        <table>
          <tr>
            <th>Método de Pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio Utilizado</th>
            <th>Valor Convertido</th>
            <th>Moeda de Conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </table>
      </div>
    );
  }
}
