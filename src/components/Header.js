import React from 'react';
import PropTypes from 'prop-types';
import trybe from '../img/trybe.jpeg';

export default function Header({ email, total }) {
  return (
    <div className="header">
      <img className="trybe" src={ trybe } alt="TRYBE Logo" />
      <h1>TRYBE WALLET</h1>
      <div className="infos-header">
        <p data-testid="total-field">
          <span data-testid="header-currency-field">BRL</span>
          {total > 0 ? total.toFixed(2) : ''}
        </p>
        <p data-testid="email-field">{ email}</p>
      </div>
    </div>
  );
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
};
