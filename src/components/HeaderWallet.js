import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './HeaderWallet.css';
import logo from '../svg/045-wallet.svg';

class HeaderWallet extends Component {
  render() {
    const { userEmail } = this.props;
    return (
      <header className="header-wallet">
        <div><img src={ logo } alt="Wallet Logo" /></div>
        <div>
          <span data-testid="email-field">{userEmail}</span>
          <span data-testid="total-field" className="header-toral">
            {999999}
            <span
              data-testid="header-currency-field"
              className="header-currency"
            >
              BRL
            </span>
          </span>
        </div>
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
