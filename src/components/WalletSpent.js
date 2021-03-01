import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { wallet } from '../actions';
import { convertedValueExchange } from '../controller/totalWalletController';

class WalletSpent extends Component {
  render() {
    const {
      expense: {
        id,
        description,
        tag,
        method,
        value,
        exchangeRates,
        currency,
      }, removeExpenseButton,
    } = this.props;

    const { name,
      ask,
      convertedValue,
    } = convertedValueExchange(exchangeRates, currency, value);

    return (
      <tr role="row">
        <td role="cell">{id}</td>
        <td role="cell">{description}</td>
        <td role="cell">{tag}</td>
        <td role="cell">{method}</td>
        <td role="cell">{value}</td>
        <td role="cell">{name}</td>
        <td role="cell">{Number(ask).toFixed(2)}</td>
        <td role="cell">{convertedValue}</td>
        <td role="cell">
          Real
        </td>
        <td role="cell">
          <button
            type="button"
            data-testid="edit-btn"
            onClick={ () => console.log('click') }
          >
            EDITAR
          </button>
          <button
            type="button"
            data-testid="delete-btn"
            onClick={ () => removeExpenseButton(id) }
          >
            REMOVER
          </button>
        </td>
      </tr>
    );
  }
}

WalletSpent.propTypes = {
  expense: PropTypes.shape({
    id: PropTypes.number,
    value: PropTypes.string,
    description: PropTypes.string,
    currency: PropTypes.string,
    tag: PropTypes.string,
    method: PropTypes.string,
    conversionMethod: PropTypes.string,
    exchange: PropTypes.string,
    ask: PropTypes.string,
    converted: PropTypes.string,
    exchangeRates: PropTypes.shape(PropTypes.object),
  }).isRequired,
  removeExpenseButton: PropTypes.func.isRequired,
};
function mapDispatchToProps(dispatch) {
  return {
    removeExpenseButton: bindActionCreators(wallet.removeExpense, dispatch),
  };
}

function mapStateToProps({ wallet: { expenses } }) {
  return {
    expenses,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(WalletSpent);
