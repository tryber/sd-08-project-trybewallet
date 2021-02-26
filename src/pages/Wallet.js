import React from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
// import fetchCoins from '../services';
import Header from '../components/Header';
import FormWallet from '../components/FormWallet';
import Table from '../components/Table';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <div><Header /></div>
        <div><FormWallet /></div>
        <div><Table /></div>
      </div>
    );
  }
}

export default connect()(Wallet);
