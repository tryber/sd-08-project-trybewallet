import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './Header.css';

class Header extends Component {
  render() {
    const { email, total } = this.props;
    return (
      <header className="wallet-header">
        <span><h2>Trybe Wallet</h2></span>
        <span data-testid="email-field">{ email }</span>
        <span data-testid="total-field">{ total }</span>
        <span data-testid="header-currency-field">BRL</span>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
};

function mapStateToProps(state) {
  return ({
    email: state.user.email,
    total: state.wallet.total,
  });
}

export default connect(mapStateToProps)(Header);
