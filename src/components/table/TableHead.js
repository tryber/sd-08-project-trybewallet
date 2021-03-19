import React, { Component } from 'react';

class TableHead extends Component {
  render() {
    const tableHead = [
      'Descrição',
      'Tag',
      'Método de pagamento',
      'Valor',
      'Moeda',
      'Câmbio utilizado',
      'Valor convertido',
      'Moeda de conversão',
      'Editar/Excluir',
    ];

    return (
      <tr>
        {tableHead.map((i, index) => <th key={ index }>{i}</th>)}
      </tr>
    );
  }
}

export default TableHead;
