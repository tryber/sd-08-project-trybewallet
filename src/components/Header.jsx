import React from 'react';
import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { email } = this.props;
    return (
      <div>
        TrybeWallet
        email
        <input value={ email } data-testid="email-field" />
        depesa total
        <input value="0" data-testid="total-field" />
        <input value="BRT" data-testid="header-currency-field" readOnly />
      </div>
    );
  }
}
Header.propTypes = {
  email: PropTypes.string.isRequired,
};

export default Header;
