import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import WalletHeader from '../components/WalletHeader';
import WalletForm from '../components/WalletForm';
import { walletThunk } from '../actions';
import TableComponent from '../components/TableComponent';

class Wallet extends React.Component {
  componentDidMount() {
    const { fetchCurrencies } = this.props;
    fetchCurrencies();
  }

  render() {
    return (
      <div>
        <WalletHeader />
        <WalletForm />
        <TableComponent />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchCurrencies: (value) => dispatch(walletThunk(value)),
});

export default connect(null, mapDispatchToProps)(Wallet);

Wallet.propTypes = {
  fetchCurrencies: PropTypes.func.isRequired,
};
