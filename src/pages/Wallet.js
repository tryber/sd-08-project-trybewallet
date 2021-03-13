import React from 'react';
import Form from '../components/Form';
import Header from '../components/Header';
import Table from '../components/Table';

class Wallet extends React.Component {
  render() {
    return (
      <>
        <Header />
        <Form />
        <Table />
      </>
    );
  }
}

export default Wallet;
