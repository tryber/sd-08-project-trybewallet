import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Wallet from '../pages/Wallet';

class HeaderWallet extends Component {
  render() {
    const { userEmail } = this.props;
    return (
      <header>
        <span data-testid="email-field">{userEmail}</span>
        <span data-testid="total-field">{0}</span>
        <span data-testid="header-currency-field">BRL</span>
      </header>
    );
  }
}

function mapStateToProps(state) {
  return {
    userEmail: state.user.email,
  };
}

export default connect(mapStateToProps)(HeaderWallet);

HeaderWallet.propTypes = {
  userEmail: PropTypes.string.isRequired,
};
