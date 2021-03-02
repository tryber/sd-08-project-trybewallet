import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

class Wallet extends React.Component {
  render() {
    const { email } = this.props;
    return (
      <header>
        <p data-testid="email-field">
          Email:
          {email}
        </p>
        <p data-testid="total-field">
          Despesa Total:
          {0}
        </p>
        <p data-testid="header-currency-field">
          Cambio:
          BRL
        </p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

Wallet.propTypes = {
  email: propTypes.string.isRequired,
};

export default connect(mapStateToProps)(Wallet);
