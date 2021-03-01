import React from 'react';

class Table extends React.Component {
  tableOrder() {
    const { expenses } = this.props;
    if (expenses.length !== 0) {
      return expenses.map((order, index) => {
        return (
          <tr key={ index }>
            <td>{order.description}</td>
            <td>{order.tag}</td>
            <td>{order.payment}</td>
            <td>{order.value}</td>
            <td>{order.exchangeRates[order.currency].name}</td>
            <td>{order.exchangeRates[order.currency].ask}</td>
            <td>{order.value * order.exchangeRates[order.currency].ask}</td>
            <td>Real</td>
            <td>
              <button type="button">Editar</button>
              <button type="button">Excluir</button>
            </td>
          </tr>
        );
      });
    }
    return <tr>{}</tr>;
  }

  render() {
    return (
      <table className="table">
        <thead>
          <tr>
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
          {this.tableOrder()}
        </thead>
      </table>
    );
  }
}

export default Table;
