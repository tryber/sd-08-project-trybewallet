import React from 'react';
import ExpenseTableRow from './ExpenseTableRow';

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
        <ExpenseTableRow />
      </table>
    );
  }
}

export default ExpensesTable;
