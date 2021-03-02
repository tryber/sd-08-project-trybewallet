import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removeExpenseAct } from '../../actions';

const WalletTd = ({ data, removeExpense }) => {
  const { value, currency, exchangeRates, description, tag, method, id } = data;
  const parsedValue = Math.round(parseFloat(value) * 100) / 100;
  let ask = parseFloat(exchangeRates[currency].ask);
  let transformedValue = parsedValue * ask;
  transformedValue = Math.round(transformedValue * 100) / 100;
  ask = Math.round(ask * 100) / 100;
  const currencyName = exchangeRates[currency].name;

  const remove = () => {
    removeExpense(id);
  };

  return (
    <tr>
      <td>{description}</td>
      <td>{tag}</td>
      <td>{method}</td>
      <td>{parsedValue}</td>
      <td>{currencyName}</td>
      <td>{ask}</td>
      <td>{transformedValue}</td>
      <td>Real</td>
      <td>
        <button type="button">Edi</button>
        <button type="button" onClick={ remove } data-testid="delete-btn">Del</button>
      </td>
    </tr>
  );
};

WalletTd.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    value: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    currency: PropTypes.string.isRequired,
    method: PropTypes.string.isRequired,
    tag: PropTypes.string.isRequired,
    exchangeRates: PropTypes.shape({}).isRequired,
  }).isRequired,
  removeExpense: PropTypes.func.isRequired,
};

const mapDispatch = (dispatch) => ({
  removeExpense: (id) => dispatch(removeExpenseAct(id)),
});

// const mapState = (state) => ({
//   expenses: state.wallet.expenses,
// });

export default connect(null, mapDispatch)(WalletTd);
