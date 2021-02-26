import React from 'react';
import PropTypes from 'prop-types';

export default function Header({ email }) {
  return (
    <div className="header">
      <h1>TRYBE WALLET</h1>
      <div className="infos-header">
        <p data-testid="total-field">
          0
          <span data-testid="header-currency-field">BRL</span>
        </p>
        <p data-testid="email-field">{email}</p>
      </div>
    </div>
  );
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
};
