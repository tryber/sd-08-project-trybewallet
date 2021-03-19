import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { email, total } = this.props;
    return (
      <>
        <span data-testid="email-field">{ email }</span>
        <span data-testid="total-field">{ total }</span>
        <span data-testid="header-currency-field">BRL</span>
      </>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  total: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  total: state.wallet.total,
});

export default connect(mapStateToProps, null)(Header);
