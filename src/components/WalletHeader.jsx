import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../styles/wallet-header.css';
import sumExpensesTotal from '../services/wallet';

class WalletHeader extends React.Component {
  render() {
    const { userEmail, expensesInTable } = this.props;
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
              {
                expensesInTable.length === 0
                  ? '0.00'
                  : sumExpensesTotal(expensesInTable)
              }

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
  expensesInTable: state.wallet.expenses,
});

WalletHeader.propTypes = {
  userEmail: PropTypes.string.isRequired,
  expensesInTable: PropTypes.shape().isRequired,
};

export default connect(mapStateToProps)(WalletHeader);
