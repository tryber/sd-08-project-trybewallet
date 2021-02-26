import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import WalletHeader from '../components/WalletHeader';
import { WalletForms } from '../components/WalletForms';

class Wallet extends React.Component {
  render() {
    const { email } = this.props;
    return (
      <main>
        <WalletHeader email={ email } />
        <WalletForms />
      </main>);
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

Wallet.propTypes = {
  email: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps)(Wallet);
