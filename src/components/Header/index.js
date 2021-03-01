import React from 'react';
import PropTypes from 'prop-types';

const Header = ({ email, total }) => (
  <header>
    <div>
      <p>
        Email:
        <span data-testid="email-field">{email}</span>
      </p>
    </div>
    <div>
      <p>
        despesas:
        <span data-testid="total-field">{total}</span>
      </p>
    </div>
    <div>
      <p data-testid="header-currency-field">BRL</p>
    </div>
  </header>
);

Header.propTypes = {
  email: PropTypes.string,
  total: PropTypes.number,
}.isRequired;

export default Header;
