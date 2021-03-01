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
      selectExpenseButton,
    } = this.props;

    const { name,
      ask,
      convertedValue,
    } = convertedValueExchange(exchangeRates, currency, value);
    return (
      <tr>
        <td>{id}</td>
        <td>{description}</td>
        <td>{tag}</td>
        <td>{method}</td>
        <td>{value}</td>
        <td>{name}</td>
        <td>{Number(ask).toFixed(2)}</td>
        <td>{convertedValue}</td>
        <td>
          Real
        </td>
        <td>
          <button
            type="button"
            data-testid="edit-btn"
            onClick={ () => selectExpenseButton(id) }
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
    id: PropTypes.number.isRequired,
    value: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    currency: PropTypes.string.isRequired,
    tag: PropTypes.string.isRequired,
    method: PropTypes.string.isRequired,
    ask: PropTypes.string.isRequired,
    exchangeRates: PropTypes.shape(PropTypes.string),
  }),
  selectExpenseButton: PropTypes.func.isRequired,
  removeExpenseButton: PropTypes.func.isRequired,
};

WalletSpent.defaultProps = {
  expense: [{ exchangeRates: {} }],
};

function mapDispatchToProps(dispatch) {
  return {
    selectExpenseButton: bindActionCreators(wallet.selectExpense, dispatch),
    removeExpenseButton: bindActionCreators(wallet.removeExpense, dispatch),
  };
}

function mapStateToProps({ wallet: { expenses } }) {
  return {
    expenses,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(WalletSpent);
