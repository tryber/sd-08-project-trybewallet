import React from 'react';
import PropTypes from 'prop-types';
import { roundUp } from '../services';

class Header extends React.Component {
  render() {
    const { email, totalValue } = this.props;
    return (
      <header>
        <span data-testid="email-field">{`Email: ${email}`}</span>
        <span data-testid="total-field">
          {`Despesa total: ${roundUp(totalValue, 2)}`}
        </span>
        <span data-testid="header-currency-field">BRL</span>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  totalValue: PropTypes.number.isRequired,
};

export default Header;
