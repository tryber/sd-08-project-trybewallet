import React from 'react';
import PropTypes from 'prop-types';

const WalletHeader = ({ email, total }) => (
  <header>
    <h1>Trybe Wallet React-Redux</h1>
    <h3 data-testid="email-field">{email}</h3>
    <h3 data-testid="total-field">{total}</h3>
    <h3 data-testid="header-currency-field">BRL</h3>
  </header>
);

WalletHeader.propTypes = {
  email: PropTypes.string,
}.isRequired;

export default WalletHeader;
