import React from 'react';
import AddForm from '../components/AddForm';
import Headers from '../components/Header';
import Table from '../components/Table';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <Headers />
        <AddForm />
        <Table />
      </div>
    );
  }
}

export default Wallet;
