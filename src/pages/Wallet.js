import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { WalletHeader, WalletForm, WalletTable } from '../components';

class Wallet extends React.Component {
  render() {
    const { email } = this.props;
    return (
      <>
        <WalletHeader email={ email } />
        <WalletForm />
        <WalletTable />
      </>
    );
  }
}

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
};

const mapState = (state) => ({
  email: state.user.email,
});

export default connect(mapState)(Wallet);
