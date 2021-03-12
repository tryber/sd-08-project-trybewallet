import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Wallet extends React.Component {
  render() {
    const { receivedEmail } = this.props;
    return (
      <header>
        <h1>TrybeWallet</h1>
        <div data-testid="email-field">
          {receivedEmail}
        </div>
        <div>
          <p>Despesas totais: </p>
        </div>
        <span data-testid="total-field">0</span>
        <span data-testid="header-currency-field">BRL</span>

      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  receivedEmail: state.user.email,
});

Wallet.propTypes = {
  receivedEmail: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, null)(Wallet);
