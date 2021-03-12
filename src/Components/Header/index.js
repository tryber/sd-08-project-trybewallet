import React from 'react';
import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { user, totalExpenses } = this.props;
    return (
      <header>
        <div>
          <p data-testid="email-field">{ user }</p>
          <div data-testid="total-field">{ totalExpenses }</div>
          <div data-testid="header-currency-field">BRL</div>
        </div>
      </header>
    );
  }
}
Header.propTypes = {
  user: PropTypes.string.isRequired,
  totalExpenses: PropTypes.number.isRequired,
};

export default Header;
