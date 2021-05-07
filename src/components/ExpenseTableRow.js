import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class ExpensesTableRow extends Component {
  render() {
    const { expenses } = this.props;
    return (
      <tbody>
        {expenses.map(({ id, value, description, currency,
          method, tag, exchangeRates }) => {
          const dayCurrency = exchangeRates[currency];
          const sumExpense = dayCurrency.ask * Number(value);
          return (
            <tr key={ id }>
              <td>{description}</td>
              <td>{tag}</td>
              <td>{method}</td>
              <td>{value}</td>
              <td>{dayCurrency.name}</td>
              <td>{Math.round(dayCurrency.ask * 100) / 100}</td>
              <td>{Math.round(sumExpense * 100) / 100}</td>
              <td>Real</td>
            </tr>
          );
        })}
      </tbody>
    );
  }
}

ExpensesTableRow.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = ({ wallet: { expenses } }) => ({
  expenses,
});

export default connect(mapStateToProps)(ExpensesTableRow);
