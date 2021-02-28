import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class WalletHeader extends React.Component {
  render() {
    const { loggedUserEmail, totalExpenses } = this.props;
    return (
      <>
        <h2 data-testid="email-field">{ loggedUserEmail }</h2>
        <h2 data-testid="total-field">{ `Total: R$${totalExpenses}` }</h2>
        <h2 data-testid="header-currency-field">BRL</h2>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  loggedUserEmail: state.user.email,
  totalExpenses: state.wallet.totalExpenses,
});

WalletHeader.propTypes = {
  loggedUserEmail: PropTypes.string.isRequired,
  totalExpenses: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, null)(WalletHeader);
