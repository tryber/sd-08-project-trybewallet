import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../styles/Header.css';

class Header extends Component {
  constructor() {
    super();
    this.valueAmount = this.valueAmount.bind(this);
  }

  // Auxílio do Paulo Simões (estudo dirigido dia 28/02/2021)
  // https://github.com/plantao-de-alunos-trybe/plantao-trybe-wallet-live-code

  valueAmount() {
    const { valueCurrency } = this.props;
    return valueCurrency.map(({ currency, value, exchangeRates }) => {
      const currencyDate = exchangeRates[currency];
      const amount = Number(value) * Number(currencyDate.ask);
      return amount;
    }).reduce((acc, valCur) => acc + valCur, 0);
  }

  render() {
    const { showEmail } = this.props;
    return (
      <header className="header">
        <dl className="headerContainer">
          <div className="headerContext">
            <dt>Email:</dt>
            <dd data-testid="email-field">
              {showEmail}
            </dd>
          </div>
          <div className="headerContext">
            <dt>Total:</dt>
            <dd data-testid="total-field">
              R$:
              {(Math.round(this.valueAmount() * 100) / 100).toFixed(2)}
            </dd>
          </div>
          <div className="headerContext">
            <dt>Câmbio</dt>
            <dd data-testid="header-currency-field">
              BRL
            </dd>
          </div>
        </dl>
      </header>
    );
  }
}

// lendo o store do redux
const mapStateToProps = (state) => {
  const { user, wallet } = state;
  return {
    showEmail: user.email,
    valueCurrency: wallet.expenses,
  };
};

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  showEmail: PropTypes.string.isRequired,
  valueCurrency: PropTypes.arrayOf(PropTypes.object).isRequired,
};
