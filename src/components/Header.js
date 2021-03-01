import React from 'react';
import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { email, total } = this.props;
    return (
      <header className="header">
        <h2 data-testid="email-field">
          Email:
          { ` ${email}` }
        </h2>
        <div className="header-row">
          <h3 data-testid="total-field">
            Total:
            { total }
          </h3>
          <h3 data-testid="header-currency-field">BRL</h3>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  total: PropTypes.string.isRequired,
};

export default Header;
