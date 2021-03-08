import React from 'react';
import ExpensesTableRow from './ExpenseTableRow';

class ExpensesTable extends React.Component {
  render() {
    return (
      <table className="table table-bordered">
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
        </thead>
        <ExpensesTableRow />
      </table>
    );
  }
}

export default ExpensesTable;
