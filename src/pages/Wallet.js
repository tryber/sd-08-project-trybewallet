import React from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import WalletForm from './WalletForm';
import { getCurrenciesThunk } from '../actions/index';

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
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addCurrencies: () => dispatch(getCurrenciesThunk()),
});

export default connect(null, mapDispatchToProps)(Wallet);
