import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class WalletHeader extends React.Component {
  render() {
    const { userEmail, walletTotal } = this.props;
    return (
      <>
        <div>Trybe Wallet</div>
        <p data-testid="email-field">
          User email:
          {' '}
          {userEmail}
        </p>
        <p>
          Total de despesas:
          {' '}
          <span data-testid="total-field">
            { walletTotal || '0'}

          </span>
        </p>
        <p data-testid="header-currency-field">
          Câmbio utilizado: BRL
        </p>
      </>
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
