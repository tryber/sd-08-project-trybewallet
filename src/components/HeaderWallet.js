import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class HeaderWallet extends Component {
  render() {
    const { email } = this.props;

    return (
      <header>
        <h2 data-testid="email-field">
          Email:
          {' '}
          {email}
        </h2>
        <h3>
          Despesa total: R$
          {' '}
          <span data-testid="total-field">
            0
          </span>
          <span data-testid="header-currency-field">
            {' '}
            BRL
          </span>
        </h3>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

HeaderWallet.propTypes = {
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, null)(HeaderWallet);
