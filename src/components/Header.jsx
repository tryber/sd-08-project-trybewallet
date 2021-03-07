import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { email, expenses } = this.props;
    const currentValue = expenses
      .map((item) => {
        const currencyItem = item.currency;
        const exchangeRate = item.exchangeRates[currencyItem].ask;
        const valueItem = item.value;
        return exchangeRate * valueItem;
      })
      .reduce((acc, crr) => acc + crr, 0);
    const totalValue = ((currentValue / 100) * 100).toFixed(2);

    return (
      <fieldset>
        <img src={ walletLogo } alt="wallet" />
        <span>
          {'E-mail: '}
          {' '}
        </span>
        <span data-testid="email-field">
          {email}
          {' '}
        </span>
        <span>
          {'Total das Despesas R$ '}
          {' '}
        </span>
        <span data-testid="total-field">
          {totalValue}
        </span>
        <span
          data-testid="header-currency-field"
        >
          BRL
        </span>
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
