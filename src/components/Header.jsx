import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import walletLogo from '../images/wallet.png';
import './header-wallet.css';

class Header extends React.Component {
  render() {
    const { email, expenses } = this.props;
    const currentValues = expenses
      .map((item) => {
        const currencyItem = item.currency;
        const exchangeRates = item.exchangeRates[currencyItem].ask;
        const valueItem = item.value;
        return exchangeRates * valueItem;
      })
      .reduce((acc, crr) => acc + crr, 0);
    const totalCash = ((currentValues / 100) * 100).toFixed(2);

    return (
      <fieldset>
        <div className="header">
          <div className="image-div">
            <img src={ walletLogo } alt="wallet" className="wallet-logo" />
          </div>
          <div className="span-div">
            <span>
              {'E-mail: '}
              {' '}
            </span>
            <span data-testid="email-field" className="email-field">
              {email}
              {' '}
            </span>
            <span>
              {'Total das Despesas R$ '}
              {' '}
            </span>
            <span data-testid="total-field" className="total-field">
              {totalCash}
            </span>
            <span
              data-testid="header-currency-field"
              className="header-currency-field"
            >
              BRL
            </span>
          </div>
        </div>
      </fieldset>
    );
  }
}
const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};
