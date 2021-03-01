import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import SelectExchange from './WalletForm/SelectExchange';
import OptionExchange from './WalletForm/SelectExchange/OptionExchange';
import { wallet } from '../actions';
import { totalMoneyInTheWallet } from '../controller/totalWalletController';

class WalletHeader extends React.Component {
  render() {
    const {
      email,
      placeOfAcronym,
      currencies,
      expenses,
      addCurrentExchange,
    } = this.props;

    const walletTotal = totalMoneyInTheWallet(expenses, placeOfAcronym)
      .replace(',', '.')
      .split(' ');
    return (
      <header>
        <h1>TrybeWallet</h1>
        <div>
          <span data-testid="email-field">{email}</span>
          <strong>
            {`Despesa Total: ${walletTotal[0]}` }
            <span data-testid="total-field">
              {walletTotal[1] === '0.00'
                ? 0 : walletTotal[1]}
            </span>
          </strong>

          <SelectExchange
            data-testid="header-currency-field"
            name="currency-field"
            id="id-currency-field"
            options={ currencies }
            onChange={ ({ target }) => addCurrentExchange(target.value) }
          >
            <OptionExchange
              item="BRL"
              value="BRL"
            />
          </SelectExchange>

        </div>
      </header>
    );
  }
}

function mapStateToProps(
  { user: { email },
    wallet: { expenses, currencies, exchange: placeOfAcronym },
  },
) {
  return {
    email,
    placeOfAcronym,
    currencies,
    expenses,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addCurrentExchange: bindActionCreators(wallet.addExchange, dispatch),
  };
}

WalletHeader.propTypes = {
  email: PropTypes.string.isRequired,
  placeOfAcronym: PropTypes.string,
  currencies: PropTypes.arrayOf(PropTypes.string),
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  addCurrentExchange: PropTypes.func.isRequired,
};

WalletHeader.defaultProps = {
  currencies: [],
  placeOfAcronym: 'BRL',
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletHeader);
