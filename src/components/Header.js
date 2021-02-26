import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { email } = this.props;
    return (
      <header className="wallet-header">
        <span data-testid="email-field">{ email }</span>
        <span data-testid="total-field">0</span>
        <span data-testid="header-currency-field">BRL</span>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
  return ({
    email: state.user.email,
  });
}

export default connect(mapStateToProps)(Header);
