import React from 'react';
import { connect } from 'react-redux';
import '../../styles/expenses-table.css';
import PropTypes from 'prop-types';
import ExpenseRow from './ExpenseRow';

class ExpensesTable extends React.Component {
  render() {
    const { expensesArray } = this.props;
    return (
      <table>
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
        {expensesArray.map((expense) => (<ExpenseRow
          key={ expense.id }
          expense={ expense }
        />))}
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expensesArray: state.wallet.expenses,
});

ExpensesTable.propTypes = {
  expensesArray: PropTypes.arrayOf().isRequired,
};

export default connect(mapStateToProps)(ExpensesTable);
