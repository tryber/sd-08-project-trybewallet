import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Table extends React.Component {
  render() {
    const { expenses } = this.props;
    console.log(expenses);
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
        { expenses.map((expense) => (
          <tr key={ expense.id }>
            <td>{ expense.description }</td>
            <td>{ expense.tag }</td>
            <td>{ expense.method }</td>
            <td>{ expense.value }</td>
            <td>{ expense.exchangeRates[expense.currency].name }</td>
            <td>
              {
                parseFloat(expense.exchangeRates[expense.currency].ask)
                  .toFixed(2)
              }
            </td>
            <td>
              {
                parseFloat((expense.value)
                * (expense.exchangeRates[expense.currency].ask))
                  .toFixed(2)
              }
            </td>
            <td>Real</td>
            <td>
              <button type="button">editar</button>
              <button type="button" data-testid="delete-btn">x</button>
            </td>
          </tr>
        )) }
      </table>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
