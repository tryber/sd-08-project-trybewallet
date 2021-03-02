import React, { Component } from 'react';

class TableHead extends Component {
  render() {
    return (
      <thead>
        <tr>
          <th className="table-head-division">Descrição</th>
          <th className="table-head-division">Tag</th>
          <th className="table-head-division">Método de pagamento</th>
          <th className="table-head-division">Valor</th>
          <th className="table-head-division">Moeda</th>
          <th className="table-head-division">Câmbio utilizado</th>
          <th className="table-head-division">Valor convertido</th>
          <th className="table-head-division">Moeda de conversão</th>
          <th>Editar/Excluir</th>
        </tr>
      </thead>
    );
  }
}

export default TableHead;
