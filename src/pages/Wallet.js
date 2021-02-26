import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../App.css';

class Wallet extends Component {
  render() {
    const { userEmail } = this.props;
    return (
      <header className="Wallet-header">
        <span data-testid="email-field">{userEmail}</span>
        <span data-testid="total-field">0</span>
        <span data-testid="header-currency-field">BRL</span>
      </header>
    );
  }
}

Wallet.propTypes = {
  userEmail: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
});

export default connect(mapStateToProps, null)(Wallet);
