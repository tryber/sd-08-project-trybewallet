import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Wallet extends Component {
  constructor() {
    super();
    this.state = {
      amount: 0,
      exchange: 'BRL',

    };
  }

  render() {
    const { email } = this.props;
    const { amount, exchange } = this.state;

    return (
      <header>
        <p data-testid="email-field">
          {email}
        </p>
        <p data-testid="total-field">{ amount }</p>
        <p data-testid="header-currency-field">{ exchange }</p>

      </header>);
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,

});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, null)(Wallet);
