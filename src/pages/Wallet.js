import React from 'react';
import Options from '../components/Options';
import Table from '../components/Table';

class Wallet extends React.Component {
  render() {
    return (
      <>
        {/* <Header /> */}
        <Options />
        <Table />
      </>
    );
  }
}

export default Wallet;
