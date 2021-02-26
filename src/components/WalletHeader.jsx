import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class WalletHeader extends React.Component {
  render() {
    const { userEmail } = this.props;
    return (
      <>
        <div>Trybe Wallet</div>
        <p data-testid="email-field">
          User email:
          {' '}
          {userEmail}
        </p>
        <p data-testid="total-field">
          Total de despesas: 0
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
});

WalletHeader.propTypes = {
  userEmail: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(WalletHeader);
