import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const WalletTable = (props) => {
  const { expenses, exchangeRates } = props;
  // const { exchangeRates } = expenses;
  console.log(exchangeRates);
  // console.log(Object.values(exchangeRates).find((e) => e.code === 'USD'));
  // const currencyUsed = exchangeRates.find((e) => e[expenses.currency] === expenses.currency);
  // console.log(currencyUsed);

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
            {console.log(expense.exchangeRates[expense.currency].name)}
            <td>{expense.value}</td>
            <td>{expense.exchangeRates[expense.currency].name}</td>
            <td>{parseFloat(expense.exchangeRates[expense.currency].ask).toFixed(2)}</td>
            <td>{expense.value * expense.exchangeRates[expense.currency].ask}</td>
            <td>Real</td>
            <button type="button">Editar</button>
            <button type="button">Excluir</button>
          </tr>))}
      </tbody>
    </table>
  );
};

WalletTable.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object),
}.isRequired;

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  exchangeRates: state.wallet.exchangeRates,
});

export default connect(mapStateToProps)(WalletTable);
