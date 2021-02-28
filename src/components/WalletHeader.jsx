import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../styles/wallet-header.css';

class WalletHeader extends React.Component {
  render() {
    const { userEmail, walletTotal } = this.props;
    return (
      <div className="header">
        <div className="header-logo">Trybe Wallet</div>
        <ul className="wallet-data">
          <li data-testid="email-field">
            Email:
            {' '}
            {userEmail}
          </li>
          <li>
            Despesa Total: R$
            {' '}
            <span data-testid="total-field">
              { walletTotal || '0.00'}
            </span>
          </li>
          <li data-testid="header-currency-field">
            BRL
          </li>
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  walletTotal: state.wallet.total,
});

WalletHeader.propTypes = {
  userEmail: PropTypes.string.isRequired,
  walletTotal: PropTypes.number,
};

WalletHeader.defaultProps = {
  walletTotal: 0,
};
export default connect(mapStateToProps)(WalletHeader);
