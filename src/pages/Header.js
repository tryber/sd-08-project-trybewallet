import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  total() {
    const { walletexpenses } = this.props;
    return walletexpenses.map(({ value, currency, exchangeRates }) => {
      const currencyData = exchangeRates[currency];
      const total = Number(value) * Number(currencyData.ask);
      return total;
    }).reduce((acc, curr) => acc + curr, 0);
  }

  render() {
    const { stateUser } = this.props;
    return (
      <>
        <header data-testid="email-field">{stateUser}</header>
        <section
          data-testid="total-field"
        >
          Despesas Totais:
          {(Math.round(this.total() * 100) / 100).toFixed(2)}
        </section>
        <div
          data-testid="header-currency-field"
        >
          BRL
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  stateUser: state.user.email,
  walletexpenses: state.wallet.expenses,
});

Header.propTypes = {
  stateUser: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
