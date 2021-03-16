import React from 'react';
import PropTypes from 'prop-types';

export default function Header(props) {
  const { email } = props;

  return (
    <header>
      <h1>TrybeWallet</h1>
      <div data-testid="email-field">
        { email }
      </div>
      <div data-testid="value-input">
        <p>Despesas totais: </p>
        <span data-testid="total-field">0</span>
        <span data-testid="header-currency-field">BRL</span>
      </div>
    </header>
  );
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
};
