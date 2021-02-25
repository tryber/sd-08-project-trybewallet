import React from 'react';

class TableTitles extends React.Component {
  render() {
    return (
      <thead>
        <tr>
          <th>Descrição</th>
          <th>Tag</th>
          <th>Metodo de Pagamento</th>
          <th>Valor</th>
          <th>Moeda</th>
          <th>Cambio Utilizado</th>
          <th>Valor Convertido</th>
          <th>Moeda de Conversão</th>
          <th>Editar/Excluir</th>
        </tr>
      </thead>
    );
  }
}

export default TableTitles;
