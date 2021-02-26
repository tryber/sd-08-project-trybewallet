import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class ExpensesList extends React.Component {
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
        <tbody>
          {expenses.map((expense, index) => (
            <tr key={ index }>
              <td>{expense.description}</td>
              <td>{expense.tag}</td>
              <td>{expense.method}</td>
              <td>{expense.value}</td>
              <td>{expense.currency}</td>
              <td>
                {`R$ ${parseFloat(expense.exchangeRates[expense.currency].ask)
                  .toFixed(2)}`}
              </td>
              <td>
                {`R$ ${expense.value
                * parseFloat(expense.exchangeRates[expense.currency].ask)
                  .toFixed(2)}`}
              </td>
              <td>Real Brasileiro</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

ExpensesList.propTypes = ({
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
});

export default connect(mapStateToProps, null)(ExpensesList);
