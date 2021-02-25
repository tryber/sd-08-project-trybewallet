import React from 'react';
import Header from '../components/Header';

export default class Wallet extends React.Component {
  render() {
    // const { email } = this.props;
    return (
      <div>
        <Header />
        <table>
          <tr>
            <td>Valor:</td>
            <td>
              <input />
            </td>
            <td>Moeda:</td>
            <td>
              <input />
            </td>
            <td>Método de Pagamento:</td>
            <td>
              <input />
            </td>
            <td>Tag:</td>
            <td>
              <input />
            </td>
            <td>Descrição:</td>
            <td>
              <input />
            </td>
            <td>
              <button type="submit">
                Adicionar Despesas
              </button>
            </td>
          </tr>
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
