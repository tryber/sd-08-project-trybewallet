import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Table extends React.Component {
  constructor() {
    super();
    this.state = {
    };
  }

  render() {
    const { expenses } = this.props;
    return (
      <table className="table">
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
          {expenses.map((expense) => {
            const currencyDetail = expense.currency;
            const exchangeRate = expense.exchangeRates[currencyDetail].ask;
            const exchangeRateFixed = (
              Math.round(parseFloat(exchangeRate) * 100) / 100).toString();
            const convertedeValue = parseFloat(exchangeRate) * parseFloat(expense.value);
            const converteeValueFixed = (
              Math.round(convertedeValue * 100) / 100).toString();
            return (
              <tr key={ expense.id }>
                <td>{expense.description}</td>
                <td>{expense.tag}</td>
                <td>{expense.method}</td>
                <td>{expense.value}</td>
                <td>{expense.exchangeRates[currencyDetail].name}</td>
                <td>
                  {exchangeRateFixed}
                </td>
                <td>
                  {converteeValueFixed}
                </td>
                <td>Real</td>
                <td>Edit/delete</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

// const mapDispatchToProps = (dispatch) => ({
//   fetchCurrency: () => dispatch(fetchCurrencyAction()),
//   addExpense: (expense) => dispatch(addExpenseAction(expense)),
// });

const mapStateToProps = (state) => ({
  currencyObject: state.wallet.currencies,
  isFetching: state.wallet.isFetching,
  expenses: state.wallet.expenses,
});

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps)(Table);
