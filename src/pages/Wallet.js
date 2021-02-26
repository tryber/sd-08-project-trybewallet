import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Wallet extends React.Component {
  render() {
    const { userData } = this.props;
    return (
      <>
        <header data-testid="email-field">
          Trybe Wallet
          <span>
            {userData.email}
          </span>
        </header>
        <span data-testid="total-field">0</span>
        <span data-testid="header-currency-field"> BRL </span>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  userData: state.user,
});

Wallet.propTypes = {
  userData: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Wallet);
