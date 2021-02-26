import React from 'react';

export default class Table extends React.Component {
  render() {
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Método de Pagamento  </th>
              <th>Valor  </th>
              <th>Moeda  </th>
              <th>Câmbio Utilizado  </th>
              <th>Valor Convertido  </th>
              <th>Moeda de Conversão  </th>
              <th>Editar/Excluir  </th>
            </tr>
          </thead>
        </table>
      </div>
    );
  }
}
