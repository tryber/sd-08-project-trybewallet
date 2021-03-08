import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Table extends Component {
  render() {
    const { expenses } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <td>Moeda</td>
            <td>Valor</td>
            <td>Câmbio utilizado</td>
            <td>Moeda de conversão</td>
            <td>Valor convertido</td>
            <td>Descrição</td>
            <td>Tag</td>
            <td>Método de pagamento</td>
            <td>Editar/Excluir</td>
          </tr>
        </thead>
        <tbody>
          {
            expenses.map((expense, index) => (
              <tr key={ index }>
                <td>{expense.exchangeRates[expense.currency].name}</td>
                <td>{expense.value}</td>
                <td>
                  {parseFloat(expense.exchangeRates[expense.currency].ask).toFixed(2)}
                </td>
                <td>Real</td>
                <td>
                  {(parseInt(expense.value, 10) * parseFloat(
                    expense.exchangeRates[expense.currency].ask,
                  )).toFixed(2)}
                </td>
                <td>{expense.description}</td>
                <td>{expense.tag}</td>
                <td>{expense.method}</td>
                <td>a</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
