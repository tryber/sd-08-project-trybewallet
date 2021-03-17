import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class ExpenseTable extends Component {
  expenseRow() {
    const { expenses } = this.props;
    return (
      expenses.map((each) => (
        <tr key={ each.id }>
          <th>{each.description}</th>
          <th>{each.tag}</th>
          <th>{each.method}</th>
          <th>{each.value}</th>
          <th>{each.currency}</th>
          <th>Cambio</th>
        </tr>
      ))
    );
  }

  render() {
    return (
      <table>
        <tr>
          <th>Descrição</th>
          <th>Tag</th>
          <th>Método de pagamento</th>
          <th>Valor</th>
          <th>Moeda</th>
          <th>Câmbio</th>
        </tr>
        {this.expenseRow}
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

ExpenseTable.propTypes = {
  expenses: PropTypes.arrayOf().isRequired,
};

export default connect(mapStateToProps, null)(ExpenseTable);
