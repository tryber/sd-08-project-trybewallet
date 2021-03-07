import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from './Header';
import WalletForm from './WalletForm';
import { getCurrenciesThunk } from '../actions/index';
import Table from './Table';

class Wallet extends React.Component {
  componentDidMount() {
    const { addCurrencies } = this.props;
    addCurrencies();
  }

  render() {
    return (
      <div>
        <Header />
        <br />
        <WalletForm />
        <br />
        <Table />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addCurrencies: () => dispatch(getCurrenciesThunk()),
});

Wallet.propTypes = {
  addCurrencies: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Wallet);
