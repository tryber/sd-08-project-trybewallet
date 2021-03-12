import React from 'react';
import PropTypes from 'prop-types'

export default function Header(props) {
  const { email } = props;

  return (
    <header>
      <h1>TrybeWallet</h1>
      <div data-testid="email-field">
        { email }
      </div>
      <div>
        <p>Despesas totais: </p>
      </div>
      <span data-testid="total-field">0</span>
      <span data-testid="header-currency-field">BRL</span>
    </header>
  );
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
}
