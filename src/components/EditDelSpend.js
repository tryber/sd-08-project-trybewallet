import React from 'react';

class AddSpend extends React.Component {
  render() {
    return (
      <table>
        <tbody>
          <tr>
            <th>ID</th>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </tbody>
      </table>
    );
  }
}

export default AddSpend;
