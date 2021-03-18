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
          <th>{each.exchangeRates[each.currency].name}</th>
          <th>{parseFloat(each.exchangeRates[each.currency].ask).toFixed(2)}</th>
          <th>
            {parseFloat(each.exchangeRates[each.currency].ask * each.value).toFixed(2)}
          </th>
          <th>Real</th>
        </tr>
      ))
    );
  }

  render() {
    return (
      <table>
        <thead>
          <th>Descrição</th>
          <th>Tag</th>
          <th>Método de pagamento</th>
          <th>Valor</th>
          <th>Moeda</th>
          <th>Câmbio utilizado</th>
          <th>Valor convertido</th>
          <th>Moeda de conversão</th>
        </thead>
        <tbody>
          {this.expenseRow()}
        </tbody>
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
