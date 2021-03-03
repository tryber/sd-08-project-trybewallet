import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './Header.css';

class Header extends React.Component {
  // Auxílio do Paulo Simões (estudo dirigido dia 28/02/2021)
  // https://github.com/plantao-de-alunos-trybe/plantao-trybe-wallet-live-code
  getTotal() {
    const { expenses } = this.props;
    return expenses
      .map(({ currency, value, exchangeRates }) => {
        const currencyData = exchangeRates[currency];
        const total = Number(value) * Number(currencyData.ask);
        return total;
      })
      .reduce((acc, expense) => acc + expense, 0);
  }
  // --------------------------------------------------------------------

  render() {
    const { readEmail } = this.props;

    return (
      <header className="header">
        <dl className="header-container">
          <div className="info">
            <dt>Email:</dt>
            <dd data-testid="email-field">{ readEmail }</dd>
          </div>
          <div className="info">
            <dt>Total:</dt>
            R$
            <dd
              data-testid="total-field"
            >
              { Math.round(this.getTotal() * 100) / 100 }
            </dd>
          </div>
          <div className="info">
            <dt>Câmbio:</dt>
            <dd data-testid="header-currency-field">BRL</dd>
          </div>
        </dl>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  readEmail: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps, null)(Header);

Header.propTypes = {
  readEmail: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};
