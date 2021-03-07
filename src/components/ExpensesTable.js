import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Expenses extends React.Component {
  constructor() {
    super();

    this.handleAddExpense = this.handleAddExpense.bind(this);
  }

  handleAddExpense(expense) {
    return (
      <tr key={ expense.id }>
        <td>{expense.description}</td>
        <td>{expense.tag}</td>
        <td>{expense.method}</td>
        <td>{expense.value}</td>
        <td>{expense.exchangeRates[expense.currency].name}</td>
        <td>{parseFloat(expense.exchangeRates[expense.currency].ask).toFixed(2)}</td>
        <td>
          {(parseInt(expense.value, 10)
            * parseFloat(expense.exchangeRates[expense.currency].ask)).toFixed(2)}
        </td>
        <td>Real</td>
      </tr>
    );
  }

  render() {
    const { expenses } = this.props;

    return (
      <table>
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

        <tbody>{expenses.map(this.handleAddExpense)}</tbody>
      </table>
    );
  }
}

const mapStateToProps = ({ wallet: { expenses } }) => ({
  expenses,
});

Expenses.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps, null)(Expenses);
