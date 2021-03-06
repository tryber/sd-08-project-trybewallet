import React from 'react';
import Form from '../components/Form';
import Header from '../components/Header';
import TableWallet from '../components/TableWallet';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Form />
        <TableWallet />
      </div>
    );
  }
}

export default Wallet;
