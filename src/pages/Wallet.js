import React from 'react';
import Header from '../components/Header';
import FormWallet from '../components/FormWallet';
import Table from '../components/Table';

export default class Wallet extends React.Component {
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
