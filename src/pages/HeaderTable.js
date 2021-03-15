import React, { Component } from 'react';

class HeaderTable extends Component {
  title() {
    return (
      <tr>
        <td>Descrição</td>
        <td>Tag</td>
        <td>Método de pagamento</td>
        <td>Valor</td>
        <td>Moeda</td>
        <td>Câmbio utilizado</td>
        <td>Valor convertido</td>
        <td>Moeda de conversão</td>
        <td>Editar/Excluir</td>
      </tr>

    );
  }

  render() {
    return (<>{this.title()}</>

    );
  }
}
export default HeaderTable;
