import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { WalletHeader, WalletForm, WalletEditForm, WalletTable } from '../components';
import { requestCurrencies as requestCurrenciesAction } from '../actions/wallet';

class Wallet extends React.Component {
  componentDidMount() {
    const { requestCurrencies } = this.props;
    requestCurrencies();
  }

  render() {
    const { isEditing } = this.props;
    return (
      <div>
        <WalletHeader />
        {isEditing ? <WalletEditForm /> : <WalletForm />}
        <WalletTable />
      </div>);
  }
}

const mapStateToProps = (state) => ({
  isEditing: state.wallet.isEditing,
});

const mapDispatchToProps = (dispatch) => ({
  requestCurrencies: () => dispatch(requestCurrenciesAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);

Wallet.propTypes = {
  isEditing: PropTypes.bool,
  requestCurrencies: PropTypes.func.isRequired,
};

Wallet.defaultProps = {
  isEditing: false,
};
