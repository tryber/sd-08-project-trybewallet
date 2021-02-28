import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      despesas: 0,
      currency: 'BRL',
    };
  }

  render() {
    const { email } = this.props;
    const { despesas, currency } = this.state;
    return (
      <div>
        TrybeWallet
        <p data-testid="email-field">{email}</p>
        <p data-testid="total-field">
          Despesa total:
          {' '}
          { despesas }
        </p>
        <p data-testid="header-currency-field">
          Moeda:
          {' '}
          { currency }
        </p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, null)(Wallet);
