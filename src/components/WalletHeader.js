import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './WalletHeader.css';

const WalletHeader = ({ email, spentAmount }) => {
  const parsedAmount = (Math.round(spentAmount * 100) / 100);
  return (
    <header className="wallet-header">
      <img src="https://theme.zdassets.com/theme_assets/9633455/9814df697eaf49815d7df109110815ff887b3457.png" alt="Trybe Logo" />
      <section className="wallet-header-info">
        <p data-testid="email-field">{`Email: ${email}`}</p>
        <p data-testid="total-field">{`Despesa total: R$ ${parsedAmount}`}</p>
        <p data-testid="header-currency-field">BRL</p>
      </section>
    </header>
  );
};

WalletHeader.propTypes = {
  email: PropTypes.string.isRequired,
  spentAmount: PropTypes.number.isRequired,
};

const mapState = (state) => ({
  spentAmount: state.wallet.expenses
    .reduce((acc, { value, currency, exchangeRates }) => {
      const ask = parseFloat(exchangeRates[currency].ask);
      return acc + value * ask;
    }, 0),
});

export default connect(mapState)(WalletHeader);
