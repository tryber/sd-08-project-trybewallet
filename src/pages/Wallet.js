import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './Wallet.css';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      total: 0,
      exchange: 'BRL',
    };
  }

  render() {
    const { total, exchange } = this.state;
    const { email } = this.props;
    return (
      <div className="wallet-container">
        <header className="header">
          <div data-testid="email-field">{ email }</div>
          <div
            data-testid="total-field"
            className="total-field"
          >
            Despesas totais:
            {' '}
            { total }
            <div
              className="exchange-field"
              data-testid="header-currency-field"
            >
              {exchange}
            </div>
          </div>
        </header>
        <div>TrybeWallet</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

Wallet.propTypes = {
  email: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Wallet);
