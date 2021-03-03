import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { userEmail, totalSpend } = this.props;
    return (
      <header>
        <span data-testid="email-field">{userEmail}</span>
        <span data-testid="total-field">{totalSpend}</span>
        <span data-testid="header-currency-field">BRL</span>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  totalSpend: state.wallet.totalSpend,
});

Header.propTypes = {
  userEmail: PropTypes.string.isRequired,
  totalSpend: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);
