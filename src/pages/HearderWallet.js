import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import './HearderWallet.css';

class HearderWallet extends Component {
  render() {
    const { email, total } = this.props;

    return (
      <div className="limiter-header-wallet">
        <div className="container-header-wallet container-header-wallet-bg">
          <div className="wrap-header-wallet">
            <span className="header-wallet-logo" />
            <span
              data-testid="total-field"
              className="header-wallet-title-right "
            >
              Despesas Totais: R$
              {`${total},00`}
              {' '}
              <span data-testid="header-currency-field">BRL</span>
              {' '}
            </span>
            <span
              data-testid="email-field"
              className="header-wallet-title-left"
            >
              {email}
            </span>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({
  user: { email },
  wallet: { currencies, total },
}) => ({
  email,
  currencies,
  total,
});

export default connect(mapStateToProps, null)(HearderWallet);
HearderWallet.propTypes = {
  email: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
};
